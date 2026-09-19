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

interface ChainPrayerSlotEmailProps {
  fullName?: string
  slotLabel?: string
  phone?: string
}

const ChainPrayerSlotEmail = ({
  fullName = 'Prayer partner',
  slotLabel = 'your prayer hour',
  phone = 'Not provided',
}: ChainPrayerSlotEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your 24/7 chain prayer hour is {slotLabel}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>HOUSE OF PRAYER CHURCH DMV</Text>
        <Heading style={heading}>Your Prayer Hour Is Confirmed</Heading>
        <Text style={intro}>
          {fullName}, thank you for joining the 24/7 chain of prayer. You are standing in the gap
          for the church during the hour below.
        </Text>

        <Section style={slotBox}>
          <Text style={label}>Your prayer hour (Eastern Time)</Text>
          <Text style={slotValue}>{slotLabel}</Text>
          <Text style={note}>This hour is yours every day until you tell us otherwise.</Text>
        </Section>

        <Section style={details}>
          <Text style={label}>Name</Text>
          <Text style={value}>{fullName}</Text>
          <Text style={label}>Phone</Text>
          <Text style={value}>{phone}</Text>
        </Section>

        <Text style={verse}>
          "Watch and pray, that ye enter not into temptation." — Luke 22:46
        </Text>
        <Text style={footer}>
          If you can no longer cover this hour, reply to this email so another partner can take it.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ChainPrayerSlotEmail,
  subject: (data) => `Your 24/7 chain prayer hour: ${data.slotLabel || 'confirmed'}`,
  displayName: 'Chain prayer hour confirmation',
  previewData: {
    fullName: 'Prayer partner',
    slotLabel: '5:00 AM – 6:00 AM',
    phone: '(555) 555-0123',
  },
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
const slotBox = {
  borderTop: '3px solid #bf8c2c',
  backgroundColor: '#f8f7f3',
  padding: '20px',
  textAlign: 'center' as const,
}
const slotValue = { color: '#1b2a6b', fontSize: '26px', fontWeight: 'bold' as const, margin: '6px 0 8px' }
const details = { border: '1px solid #e4dfd2', padding: '20px', marginTop: '18px' }
const label = {
  color: '#1b2a6b',
  fontSize: '12px',
  fontWeight: 'bold' as const,
  margin: '10px 0 3px',
  textTransform: 'uppercase' as const,
}
const value = { color: '#282b35', fontSize: '15px', margin: '0 0 8px' }
const note = { color: '#777b89', fontSize: '13px', margin: '0' }
const verse = { color: '#bf8c2c', fontSize: '15px', fontStyle: 'italic' as const, margin: '24px 0 0' }
const footer = { color: '#777b89', fontSize: '12px', lineHeight: '1.5', margin: '14px 0 0' }
