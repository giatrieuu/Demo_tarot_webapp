import React, { useState, useEffect } from 'react';
import { Layout, Button, Card, message } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import AppHeader from '../../components/header/Header';
import TarotReaderSidebar from '../../components/sidebar/TarotReaderSidebar';
import ApiService from '../../services/axios'; // Import the API service

const { Content } = Layout;

interface Booking {
  day: string;
  start: string;
  end: string;
  customer: string;
  topic: string;
  status: 'success' | 'warning' | 'error';
}

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const hours = Array.from({ length: 9 }, (_, i) => i + 8); // 8AM - 5PM

const ManagerBooking: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Dayjs>(dayjs().startOf('week'));
  const [showMenu] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]); // State to store bookings
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await ApiService.fetchBookingsByReaderId(2, 1, 10); // Replace with the actual readerId
        const bookingsData = response.map((booking: any) => ({
          day: dayjs(booking.booking.timeStart).format('YYYY-MM-DD'),
          start: dayjs(booking.booking.timeStart).format('HH:mm'),
          end: dayjs(booking.booking.timeEnd).format('HH:mm'),
          customer: booking.userName,
          topic: booking.booking.note,
          status: booking.booking.status === 1 ? 'success' : 'error', // Map status based on response
        }));
        setBookings(bookingsData);
      } catch (error) {
        message.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const nextWeek = () => {
    setCurrentWeek(currentWeek.add(1, 'week'));
  };

  const prevWeek = () => {
    setCurrentWeek(currentWeek.subtract(1, 'week'));
  };

  const getDayWithDate = (index: number) => {
    return currentWeek.add(index, 'day');
  };

  const renderBooking = (day: string) => {
    const bookingsForDay = bookings.filter((b) => b.day === day);
    return bookingsForDay.map((booking, idx) => {
      const startHour = parseInt(booking.start.split(':')[0]);
      const endHour = parseInt(booking.end.split(':')[0]);
      const bookingDuration = endHour - startHour;
      const bookingHeight = bookingDuration * 100; // Adjust height based on duration
      const bookingTop = (startHour - 8) * 100; // Calculate top offset

      return (
        <div
          key={idx}
          style={{
            height: `${bookingHeight}px`,
            top: `${bookingTop}px`,
            position: 'absolute',
            left: '0',
            width: '100%',
            backgroundColor: booking.status === 'success' ? 'green' : 'red',
            borderRadius: '5px',
            color: 'white',
            padding: '4px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <div style={{ fontSize: '12px' }}>
            <p>{booking.customer}</p>
            <p>{booking.topic}</p>
            <p>
              {booking.start} - {booking.end}
            </p>
          </div>
        </div>
      );
    });
  };

  const renderMeetingDetails = (meeting: Booking) => (
    <Card title="Next Meeting" bordered={false} style={{ marginBottom: 20 }}>
      <p>Customer: {meeting.customer}</p>
      <p>
        Time: {meeting.start} - {meeting.end}
      </p>
      <p>Card deck: Card deck 1</p>
      <p>Topic: {meeting.topic}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button danger>Deny</Button>
        <Button type="primary">Accept</Button>
      </div>
    </Card>
  );

  return (
    

   
   
          <Content style={{ padding: '24px' }}>
            <div style={{ display: 'flex', gap: '20px', padding: '20px', minHeight: '100vh' }}>
              <div style={{ flex: 2 }}>
                <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', backgroundColor: '#34656D', color: 'white' }}>
                    <LeftOutlined style={{ cursor: 'pointer', fontSize: '18px' }} onClick={prevWeek} />
                    <h2 style={{ margin: '0 16px', fontSize: '18px', fontWeight: 'bold' }}>
                      {currentWeek.format('MMMM D')} - {currentWeek.add(6, 'day').format('MMMM D, YYYY')}
                    </h2>
                    <RightOutlined style={{ cursor: 'pointer', fontSize: '18px' }} onClick={nextWeek} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', borderTop: '1px solid #e0e0e0', position: 'relative' }}>
                    <div style={{ borderRight: '1px solid #e0e0e0' }}>
                      {hours.map((hour) => (
                        <div key={hour} style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span>{hour}:00</span>
                        </div>
                      ))}
                    </div>

                    {daysOfWeek.map((day, index) => {
                      const date = getDayWithDate(index);
                      return (
                        <div key={day} style={{ borderRight: '1px solid #e0e0e0', height: '900px', position: 'relative' }}>
                          <div style={{ height: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#D3E0DC', fontWeight: 'bold' }}>
                            <span>{day}</span>
                            <span style={{ fontSize: '12px' }}>{date.format('MMM D')}</span>
                          </div>
                          {renderBooking(date.format('YYYY-MM-DD'))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                {bookings.length > 0 && renderMeetingDetails(bookings[0])}

                <Card title="Now Meeting" bordered={false} style={{ marginBottom: 20 }}>
                  <p>Customer: {bookings[1]?.customer || 'No meeting'}</p>
                  <p>
                    Time: {bookings[1]?.start || ''} - {bookings[1]?.end || ''}
                  </p>
                  <p>Card deck: Card deck 1</p>
                  <p>Topic: {bookings[1]?.topic || ''}</p>
                  <Button type="primary" style={{ backgroundColor: '#FFC107' }}>
                    Report
                  </Button>
                </Card>

                <Card title="Statistics" bordered={false}>
                  <p>Total cases: 700</p>
                  <p>This month: 9</p>
                  <p>This week: 3</p>
                  <p>Denied: 0</p>
                  <h3>
                    Salary: <span style={{ color: 'green' }}>$10</span>
                  </h3>
                  <Button type="primary">Detail</Button>
                </Card>
              </div>
            </div>
          </Content>

  );
};

export default ManagerBooking;
