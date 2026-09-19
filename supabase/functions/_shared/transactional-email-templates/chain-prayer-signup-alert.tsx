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

interface ChainPrayerAlertProps {
  fullName?: string
  slotLabel?: string
  email?: string
  phone?: string
  submittedAt?: string
}

const ChainPrayerAlertEmail = ({
  fullName = 'Prayer partner',
  slotLabel = 'a prayer hour',
  email = 'Not provided',
  phone = 'Not provided',
  submittedAt = 'Just now',
}: ChainPrayerAlertProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{fullName} claimed {slotLabel} in the chain of prayer</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>HOUSE OF PRAYER CHURCH DMV</Text>
        <Heading style={heading}>New Chain Prayer Sign-Up</Heading>
        <Section style={details}>
          <Text style={label}>Prayer hour (Eastern Time)</Text>
          <Text style={value}>{slotLabel}</Text>
          <Text style={label}>Name</Text>
          <Text style={value}>{fullName}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email}</Text>
          <Text style={label}>Phone</Text>
          <Text style={value}>{phone}</Text>
        </Section>
        <Text style={footer}>Signed up {submittedAt}.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ChainPrayerAlertEmail,
  subject: (data) => `Chain prayer sign-up: ${data.slotLabel || 'new hour claimed'}`,
  displayName: 'Chain prayer sign-up alert',
  previewData: {
    fullName: 'Prayer partner',
    slotLabel: '5:00 AM – 6:00 AM',
    email: 'partner@example.com',
    phone: '(555) 555-0123',
    submittedAt: 'September 19, 2026 at 2:30 PM',
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
const details = { borderTop: '3px solid #bf8c2c', backgroundColor: '#f8f7f3', padding: '20px' }
const label = {
  color: '#1b2a6b',
  fontSize: '12px',
  fontWeight: 'bold' as const,
  margin: '10px 0 3px',
  textTransform: 'uppercase' as const,
}
const value = { color: '#282b35', fontSize: '15px', margin: '0 0 8px' }
const footer = { color: '#777b89', fontSize: '12px', margin: '24px 0 0' }
