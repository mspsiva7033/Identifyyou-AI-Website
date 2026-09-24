'use client'

import React, { useState } from 'react'
import { CaseStudyCard } from './CaseStudyCard'
import { VideoModal } from './VideoModal'

interface SmartFactoryCardProps {
  title: string
  industry: string
  image: string
  aspectRatio?: string
  videoSrc: string
  videoTitle?: string
}

export function SmartFactoryCard({
  title,
  industry,
  image,
  aspectRatio,
  videoSrc,
  videoTitle,
}: SmartFactoryCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {/* Wrapper intercepts click and opens video modal */}
      <div
        style={{ position: 'relative', cursor: 'pointer' }}
        data-smart-factory-card
        onClick={(e) => {
          e.preventDefault()
          setIsModalOpen(true)
        }}
      >
        {/* Play badge — always visible centered */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'rgba(150, 199, 61, 0.92)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 0 8px rgba(150, 199, 61, 0.2)',
          pointerEvents: 'none',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
        {/* Hide "Read Case Study" overlay — play button takes precedence */}
        <style>{`[data-smart-factory-card] a > div[class*="centerContent"] { display: none !important; }`}</style>
        <CaseStudyCard
          title={title}
          industry={industry}
          image={image}
          href="#"
          aspectRatio={aspectRatio}
        />
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoSrc={videoSrc}
        title={videoTitle || title}
      />
    </>
  )
}
