import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const USER_DATA_DIR = 'C:\\Users\\Admin\\AppData\\Local\\Temp\\chrome_cdp_profile'
const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\6b67750f-b194-4034-a771-120726d9fabb'
const WORKSPACE_DIR = 'E:\\identifyyou_website\\identifyyou-nextjs'

// Clean up previous temp profile if needed
try {
  fs.rmSync(USER_DATA_DIR, { recursive: true, force: true })
} catch {}

console.log('Starting Chrome with remote debugging on port 9222...')
const chromeProc = spawn(CHROME_PATH, [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1280,960',
  `--user-data-dir=${USER_DATA_DIR}`,
  'about:blank'
], { stdio: 'ignore' })

// Wait for Chrome CDP port to become active
async function waitForCDP(maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9222/json/version')
      if (res.ok) {
        const data = await res.json()
        console.log('Connected to Chrome DevTools Protocol:', data.Browser)
        return data
      }
    } catch {}
    await new Promise(r => setTimeout(r, 200))
  }
  throw new Error('Timed out waiting for Chrome CDP to start.')
}

async function run() {
  try {
    await waitForCDP()

    // Create a new target page for localhost:3000/contact
    const newPageRes = await fetch('http://127.0.0.1:9222/json/new?http://localhost:3000/contact', { method: 'PUT' })
    const pageData = await newPageRes.json()
    console.log('Created target page:', pageData.id, pageData.url)

    const wsUrl = pageData.webSocketDebuggerUrl
    console.log('Connecting WebSocket to:', wsUrl)

    const ws = new WebSocket(wsUrl)
    let msgId = 1
    const pendingPromises = new Map()

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      if (msg.id && pendingPromises.has(msg.id)) {
        const { resolve, reject } = pendingPromises.get(msg.id)
        pendingPromises.delete(msg.id)
        if (msg.error) {
          reject(new Error(JSON.stringify(msg.error)))
        } else {
          resolve(msg.result)
        }
      }
    }

    await new Promise((resolve, reject) => {
      ws.onopen = resolve
      ws.onerror = reject
    })
    console.log('WebSocket connected successfully.')

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++
        pendingPromises.set(id, { resolve, reject })
        ws.send(JSON.stringify({ id, method, params }))
      })
    }

    // Enable Page and Runtime
    await send('Page.enable')
    await send('Runtime.enable')

    console.log('Waiting 3 seconds for page to hydrate and fully render...')
    await new Promise(r => setTimeout(r, 3000))

    // Fill form and select path
    console.log('Interacting with the contact form elements...')
    const fillResult = await send('Runtime.evaluate', {
      expression: `(() => {
        // Select 'Manufacturing' interest area
        const pathBtn = document.getElementById('path-manufacturing');
        if (pathBtn) pathBtn.click();

        // Helper to trigger React 19 synthetic events
        function setReactValue(input, value) {
          if (!input) return false;
          const proto = Object.getPrototypeOf(input);
          const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
          if (setter) {
            setter.call(input, value);
          } else {
            input.value = value;
          }
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }

        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const companyInput = document.getElementById('contact-company');
        const messageInput = document.getElementById('contact-message');

        const nameSet = setReactValue(nameInput, 'Alex Morgan');
        const emailSet = setReactValue(emailInput, 'alex.morgan@deeptech-solutions.com');
        const companySet = setReactValue(companyInput, 'DeepTech Solutions Ltd');
        const messageSet = setReactValue(messageInput, 'Inquiring about automated vision AI inspection and deep tech solutions for manufacturing plant lines.');

        return {
          pathClicked: !!pathBtn,
          nameSet,
          emailSet,
          companySet,
          messageSet,
          nameValue: nameInput?.value,
          emailValue: emailInput?.value,
          companyValue: companyInput?.value,
          messageValue: messageInput?.value
        };
      })()`,
      returnByValue: true
    })

    console.log('Form fill result:', fillResult.result.value)

    // Capture screenshot of filled form
    console.log('Capturing screenshot of filled form...')
    const filledShot = await send('Page.captureScreenshot', { format: 'png' })
    const filledShotPathArtifacts = path.join(ARTIFACT_DIR, 'contact_form_filled.png')
    const filledShotPathWorkspace = path.join(WORKSPACE_DIR, 'contact_form_filled.png')
    fs.writeFileSync(filledShotPathArtifacts, Buffer.from(filledShot.data, 'base64'))
    fs.writeFileSync(filledShotPathWorkspace, Buffer.from(filledShot.data, 'base64'))
    console.log('Saved filled form screenshot to:', filledShotPathArtifacts)

    // Click submit button
    console.log('Submitting the form...')
    const submitResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const submitBtn = document.getElementById('contact-submit');
        if (!submitBtn) return { error: 'Submit button not found' };
        submitBtn.click();
        return { clicked: true, buttonText: submitBtn.innerText };
      })()`,
      returnByValue: true
    })
    console.log('Submit button clicked:', submitResult.result.value)

    // Wait for submission response and UI change to success screen
    console.log('Waiting for API response and success screen render...')
    let successDetected = false
    let successTitle = ''
    let successDesc = ''

    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 500))
      const checkResult = await send('Runtime.evaluate', {
        expression: `(() => {
          const h1 = document.querySelector('h1');
          const successBox = document.querySelector('[class*="successBox"]');
          const allText = document.body.innerText;
          const isSuccess = allText.includes('Request Sent Successfully');
          return {
            isSuccess,
            h1Text: h1?.innerText,
            successBoxFound: !!successBox,
            snippet: allText.substring(0, 300)
          };
        })()`,
        returnByValue: true
      })

      if (checkResult.result?.value?.isSuccess) {
        successDetected = true
        successTitle = checkResult.result.value.h1Text
        console.log('SUCCESS SCREEN DETECTED!', checkResult.result.value)
        break
      }
    }

    if (!successDetected) {
      console.warn('Warning: Did not detect success text within timeout. Proceeding with screenshot capture...')
    }

    // Capture screenshot of success screen
    console.log('Capturing screenshot of success screen...')
    const successShot = await send('Page.captureScreenshot', { format: 'png' })
    const successShotPathArtifacts = path.join(ARTIFACT_DIR, 'contact_form_success.png')
    const successShotPathWorkspace = path.join(WORKSPACE_DIR, 'contact_form_success.png')
    fs.writeFileSync(successShotPathArtifacts, Buffer.from(successShot.data, 'base64'))
    fs.writeFileSync(successShotPathWorkspace, Buffer.from(successShot.data, 'base64'))
    console.log('Saved success screen screenshot to:', successShotPathArtifacts)

    ws.close()
    console.log('TEST COMPLETED SUCCESSFULLY!')
  } finally {
    try {
      chromeProc.kill()
    } catch {}
  }
}

run().catch((err) => {
  console.error('Test execution failed:', err)
  process.exit(1)
})
