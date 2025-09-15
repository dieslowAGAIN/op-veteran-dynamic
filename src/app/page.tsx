'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { COLLECTIONS } from '@/lib/firebase/collections';
import { HeroSection, Pillar, TeamMember, Partner, Financial, MediaItem } from '@/types';
import Hero from '@/components/public/Hero';
import Pillars from '@/components/public/Pillars';
import Financials from '@/components/public/Financials';
import Media from '@/components/public/Media';
import Team from '@/components/public/Team';
import Partners from '@/components/public/Partners';
import Contact from '@/components/public/Contact';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState<HeroSection | null>(null);
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [financials, setFinancials] = useState<Financial[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Hero Section
        const heroQuery = query(
          collection(db, COLLECTIONS.HERO_CONTENT),
          where('isActive', '==', true)
        );
        const heroSnapshot = await getDocs(heroQuery);
        if (!heroSnapshot.empty) {
          const heroDoc = heroSnapshot.docs[0];
          setHeroData({ id: heroDoc.id, ...heroDoc.data() } as HeroSection);
        }

        // Fetch Pillars
        const pillarsQuery = query(
          collection(db, COLLECTIONS.PILLARS),
          where('isActive', '==', true),
          orderBy('order', 'asc')
        );
        const pillarsSnapshot = await getDocs(pillarsQuery);
        const pillarsData = pillarsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Pillar[];
        setPillars(pillarsData);

        // Fetch Team Members
        const teamQuery = query(
          collection(db, COLLECTIONS.TEAM_MEMBERS),
          where('isActive', '==', true),
          orderBy('order', 'asc')
        );
        const teamSnapshot = await getDocs(teamQuery);
        const teamData = teamSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as TeamMember[];
        setTeamMembers(teamData);

        // Fetch Partners
        const partnersQuery = query(
          collection(db, COLLECTIONS.PARTNERS),
          where('isActive', '==', true),
          orderBy('order', 'asc')
        );
        const partnersSnapshot = await getDocs(partnersQuery);
        const partnersData = partnersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Partner[];
        setPartners(partnersData);

        // Fetch Financials
        const financialsQuery = query(
          collection(db, COLLECTIONS.FINANCIALS),
          where('isActive', '==', true),
          orderBy('order', 'asc')
        );
        const financialsSnapshot = await getDocs(financialsQuery);
        const financialsData = financialsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Financial[];
        setFinancials(financialsData);

        // Fetch Media Items
        const mediaQuery = query(
          collection(db, COLLECTIONS.MEDIA_ITEMS),
          where('isActive', '==', true),
          orderBy('publishedAt', 'desc')
        );
        const mediaSnapshot = await getDocs(mediaQuery);
        const mediaData = mediaSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as MediaItem[];
        setMediaItems(mediaData.slice(0, 4)); // Show only latest 4 items

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  // Default data if nothing in database
  const defaultHero: HeroSection = {
    id: '1',
    title: 'Welcome to O.P. Veteran',
    subtitle: 'Taking care of our own. Reconnecting and supporting our nation\'s heroes.',
    ctaText: 'Join Our Community',
    ctaLink: '/get-involved',
    isActive: true,
  };

  const defaultPillars: Pillar[] = [
    {
      id: '1',
      title: 'Social Connection',
      description: 'Reconnect with fellow veterans through online communities, social media groups, and local events. Find your tribe.',
      icon: 'users',
      order: 1,
      isActive: true,
    },
    {
      id: '2',
      title: 'Community Involvement',
      description: 'Get involved in your local community. Volunteering or joining a club is a great way to meet new people with shared passions.',
      icon: 'heart',
      order: 2,
      isActive: true,
    },
    {
      id: '3',
      title: 'Mental Health',
      description: 'Seeking help is a sign of strength. We provide resources and support for the mental well-being of our veterans.',
      icon: 'shield',
      order: 3,
      isActive: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero data={heroData || defaultHero} />
        <Pillars pillars={pillars.length > 0 ? pillars : defaultPillars} />
        <Financials financials={financials} />
        {mediaItems.length > 0 && <Media items={mediaItems} />}
        {teamMembers.length > 0 && <Team members={teamMembers} />}
        {partners.length > 0 && <Partners partners={partners} />}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}