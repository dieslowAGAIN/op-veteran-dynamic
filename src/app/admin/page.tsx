'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { COLLECTIONS } from '@/lib/firebase/collections';
import { useAuth } from '@/lib/auth/context';
import { ContactSubmission, Event, Post } from '@/types';
import { formatDateTime } from '@/lib/utils';
import { 
  Users, 
  FileText, 
  Calendar, 
  MessageSquare,
  TrendingUp,
  Eye,
  DollarSign,
  Activity
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalEvents: 0,
    totalContacts: 0,
    totalViews: 0,
  });
  const [recentContacts, setRecentContacts] = useState<ContactSubmission[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch statistics
        const postsSnapshot = await getDocs(collection(db, COLLECTIONS.POSTS));
        const eventsSnapshot = await getDocs(collection(db, COLLECTIONS.EVENTS));
        const contactsSnapshot = await getDocs(collection(db, COLLECTIONS.CONTACT_SUBMISSIONS));
        
        setStats({
          totalPosts: postsSnapshot.size,
          totalEvents: eventsSnapshot.size,
          totalContacts: contactsSnapshot.size,
          totalViews: 0, // This would come from analytics
        });

        // Fetch recent unread contacts
        const contactsQuery = query(
          collection(db, COLLECTIONS.CONTACT_SUBMISSIONS),
          where('isRead', '==', false),
          orderBy('submittedAt', 'desc'),
          limit(5)
        );
        const contactsDocs = await getDocs(contactsQuery);
        const contactsData = contactsDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as ContactSubmission[];
        setRecentContacts(contactsData);

        // Fetch upcoming events
        const eventsQuery = query(
          collection(db, COLLECTIONS.EVENTS),
          where('startDate', '>=', new Date()),
          orderBy('startDate', 'asc'),
          limit(5)
        );
        const eventsDocs = await getDocs(eventsQuery);
        const eventsData = eventsDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];
        setUpcomingEvents(eventsData);

        // Fetch recent posts
        const postsQuery = query(
          collection(db, COLLECTIONS.POSTS),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const postsDocs = await getDocs(postsQuery);
        const postsData = postsDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setRecentPosts(postsData);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'bg-blue-500',
      link: '/admin/posts',
    },
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: 'bg-green-500',
      link: '/admin/events',
    },
    {
      title: 'Contact Messages',
      value: stats.totalContacts,
      icon: MessageSquare,
      color: 'bg-purple-500',
      link: '/admin/contacts',
    },
    {
      title: 'Page Views',
      value: stats.totalViews,
      icon: Eye,
      color: 'bg-orange-500',
      link: '/admin/analytics',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.displayName || user?.email}!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Contact Messages */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Messages</h2>
            <Link
              href="/admin/contacts"
              className="text-veteran-gold hover:text-yellow-600 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          
          {recentContacts.length > 0 ? (
            <div className="space-y-3">
              {recentContacts.map((contact) => (
                <Link
                  key={contact.id}
                  href={`/admin/contacts/${contact.id}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600 truncate">{contact.subject}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDateTime(contact.submittedAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No new messages</p>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <Link
              href="/admin/events"
              className="text-veteran-gold hover:text-yellow-600 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/admin/events/${event.id}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDateTime(event.startDate)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No upcoming events</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/posts/new"
            className="btn-primary text-center"
          >
            Create Post
          </Link>
          <Link
            href="/admin/events/new"
            className="btn-primary text-center"
          >
            Add Event
          </Link>
          <Link
            href="/admin/team/new"
            className="btn-primary text-center"
          >
            Add Team Member
          </Link>
          <Link
            href="/admin/settings"
            className="btn-secondary text-center"
          >
            Site Settings
          </Link>
        </div>
      </div>
    </div>
  );
}