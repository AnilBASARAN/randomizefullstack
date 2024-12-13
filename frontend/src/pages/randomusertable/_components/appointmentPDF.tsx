// components/AppointmentPDF.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
  },
});

const AppointmentPDF: React.FC<{ appointment: IAppointment }> = ({ appointment }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Appointment Confirmation</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Appointment ID:</Text>
          <Text style={styles.value}>{appointment._id}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Doctor:</Text>
          <Text style={styles.value}>{appointment.specialist}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Specialist:</Text>
          <Text style={styles.value}>{appointment.date}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{appointment.date}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{appointment.time}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{appointment.status.toUpperCase()}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Patient Name:</Text>
          <Text style={styles.value}>{appointment.patient.name}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Patient Email:</Text>
          <Text style={styles.value}>{appointment.patient.email}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Booked On:</Text>
          <Text style={styles.value}>{getDateTimeFormat(appointment.createdAt)}</Text>
        </View>
        
        {/* Add more fields as needed */}
      </View>
    </Page>
  </Document>
);

export default AppointmentPDF;
