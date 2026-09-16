/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface PrayerRequestEmailProps {
  fullName?: string
  email?: string
  phone?: string
  request?: string
  isPrivate?: boolean
  followUpRequested?: boolean
  submittedAt?: string
}

const PrayerRequestEmail = ({
  fullName = 'Church visitor',
  email = 'Not provided',
  phone = 'Not provided',
  request = 'No request text was provided.',
  isPrivate = true,
  followUpRequested = false,
  submittedAt = 'Just now',
}: PrayerRequestEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New prayer request from {fullName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>HOUSE OF PRAYER CHURCH DMV</Text>
        <Heading style={heading}>New Prayer Request</Heading>
        <Text style={intro}>
          A prayer request was submitted through the church website. Please keep this message
          confidential and follow up promptly when requested.
        </Text>

        <Section style={details}>
          <Text style={label}>Submitted by</Text>
          <Text style={value}>{fullName}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email}</Text>
          <Text style={label}>Phone</Text>
          <Text style={value}>{phone}</Text>
          <Text style={label}>Privacy</Text>
          <Text style={value}>{isPrivate ? 'Pastor only' : 'May be shared with the prayer team'}</Text>
          <Text style={label}>Follow-up</Text>
          <Text style={value}>{followUpRequested ? 'Requested right away' : 'Not requested'}</Text>
        </Section>

        <Section style={requestBox}>
          <Text style={label}>Prayer request</Text>
          <Text style={requestText}>{request}</Text>
        </Section>

        <Text style={footer}>Submitted {submittedAt}. Please handle this request with care.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PrayerRequestEmail,
  subject: (data) => `New prayer request from ${data.fullName || 'a church visitor'}`,
  displayName: 'Pastor prayer request alert',
  previewData: {
    fullName: 'Church visitor',
    email: 'visitor@example.com',
    phone: '(555) 555-0123',
    request: 'Please pray for healing and peace for my family.',
    isPrivate: true,
    followUpRequested: true,
    submittedAt: 'September 16, 2026 at 12:00 AM',
  },
  to: 'houseofprayerdmv@gmail.com',
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { maxWidth: '600px', padding: '32px 28px', margin: '0 auto' }
const eyebrow = {
  color: '#bf8c2c',
  fontSize: '12px',
  fontWeight: 'bold' as const,
  letterSpacing: '1px',
  margin: '0 0 10px',
}
const heading = { color: '#1b2a6b', fontSize: '28px', margin: '0 0 16px' }
const intro = { color: '#5f6475', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' }
const details = { borderTop: '3px solid #bf8c2c', backgroundColor: '#f8f7f3', padding: '20px' }
const label = {
  color: '#1b2a6b',
  fontSize: '12px',
  fontWeight: 'bold' as const,
  margin: '10px 0 3px',
  textTransform: 'uppercase' as const,
}
const value = { color: '#282b35', fontSize: '15px', margin: '0 0 8px' }
const requestBox = { border: '1px solid #e4dfd2', padding: '20px', marginTop: '18px' }
const requestText = { color: '#282b35', fontSize: '16px', lineHeight: '1.65', whiteSpace: 'pre-wrap' as const }
const footer = { color: '#777b89', fontSize: '12px', lineHeight: '1.5', margin: '24px 0 0' }
