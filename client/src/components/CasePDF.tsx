import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { Case } from "@shared/schema";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  text: {
    marginBottom: 5,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  proceeding: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#f5f5f5',
  },
  party: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#f5f5f5',
  },
});

export default function CasePDF({ caseData }: { caseData: Case }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Section 1: Basic Case Information */}
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.title}>Case #{caseData.caseNumber}</Text>
            <Text>{caseData.status.toUpperCase()}</Text>
          </View>

          <Text style={styles.subtitle}>{caseData.title}</Text>
          <Text style={styles.text}>{caseData.description}</Text>

          <View style={styles.grid}>
            <View>
              <Text style={styles.label}>Petitioner:</Text>
              <Text>{caseData.petitioner}</Text>
            </View>
            <View>
              <Text style={styles.label}>Respondent:</Text>
              <Text>{caseData.respondent}</Text>
            </View>
          </View>

          <Text style={styles.label}>Docketed Date:</Text>
          <Text style={styles.text}>
            {new Date(caseData.docketedDate).toLocaleDateString()}
          </Text>
        </View>

        {/* Section 2: Court Proceedings */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Court Proceedings</Text>
          {caseData.courtProceedings.length === 0 ? (
            <Text style={styles.text}>No proceedings recorded</Text>
          ) : (
            caseData.courtProceedings.map((proceeding, index) => (
              <View key={index} style={styles.proceeding}>
                <Text style={styles.label}>
                  {new Date(proceeding.date).toLocaleDateString()}
                </Text>
                <Text>{proceeding.description}</Text>
              </View>
            ))
          )}
        </View>

        {/* Section 3: Parties Involved */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Parties Involved</Text>
          {caseData.partiesInvolved.length === 0 ? (
            <Text style={styles.text}>No parties recorded</Text>
          ) : (
            caseData.partiesInvolved.map((party, index) => (
              <View key={index} style={styles.party}>
                <Text style={styles.label}>{party.name}</Text>
                <Text>Role: {party.role}</Text>
                <Text>Contact: {party.contact}</Text>
              </View>
            ))
          )}
        </View>
      </Page>
    </Document>
  );
}
