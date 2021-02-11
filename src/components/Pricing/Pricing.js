import React from 'react';
import { Button } from '../../globalStyles';
import { GiPodiumWinner } from 'react-icons/gi';
import { MdBusinessCenter, MdPersonPinCircle } from 'react-icons/md';
import { IconContext } from 'react-icons/lib';
import {
  PricingSection,
  PricingWrapper,
  PricingHeading,
  PricingContainer,
  PricingCard,
  PricingCardInfo,
  PricingCardIcon,
  PricingCardPlan,
  PricingCardCost,
  PricingCardLength,
  PricingCardFeatures,
  PricingCardFeature
} from './Pricing.elements';

function Pricing() {
  return (
    <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }}>
      <PricingSection>
        <PricingWrapper>
          <PricingHeading>Our Services</PricingHeading>
          <PricingContainer>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <MdPersonPinCircle />
                </PricingCardIcon>
                <PricingCardPlan>Starter Pack</PricingCardPlan>
                <PricingCardCost>$5.99</PricingCardCost>
                <PricingCardLength>per month</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>10 New Users</PricingCardFeature>
                  <PricingCardFeature>5 Calendars</PricingCardFeature>
                  <PricingCardFeature>Advanced Recurring Reminders</PricingCardFeature>
                  <PricingCardFeature>Color Tags</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Choose Plan</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <MdBusinessCenter />
                </PricingCardIcon>
                <PricingCardPlan>Entrepreneur Pack</PricingCardPlan>
                <PricingCardCost>$19.99</PricingCardCost>
                <PricingCardLength>per month</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>30 New Users</PricingCardFeature>
                  <PricingCardFeature>10 Calendars</PricingCardFeature>
                  <PricingCardFeature>Unlimited Daily Planner</PricingCardFeature>
                  <PricingCardFeature>Customized Themes</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Choose Plan</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <GiPodiumWinner />
                </PricingCardIcon>
                <PricingCardPlan>Corporate Pack</PricingCardPlan>
                <PricingCardCost>$29.99</PricingCardCost>
                <PricingCardLength>per month</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>Unlimited Users</PricingCardFeature>
                  <PricingCardFeature>Unlimited Calendats</PricingCardFeature>
                  <PricingCardFeature>24/7 Support</PricingCardFeature>
                  <PricingCardFeature>Location Reminders(Mobile)</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Choose Plan</Button>
              </PricingCardInfo>
            </PricingCard>
          </PricingContainer>
        </PricingWrapper>
      </PricingSection>
    </IconContext.Provider>
  );
}
export default Pricing;