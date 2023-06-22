// import React from "react";
// import {Page, Text, View, Document, StyleSheet, Font} from "@react-pdf/renderer";

// import {format} from "date-fns";

// // import type {Invoice, Item} from "@prisma/client";

// Font.register({
//   family: "Oswald",
//   src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
// });

// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: "#E4E4E4",
//     fontFamily: "Oswald",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 700,
//     color: "#131925",
//     marginBottom: 8,
//   },
//   statement: {
//     fontSize: 18,
//     fontWeight: 700,
//     color: "#131925",
//     lineHeight: 1.4,
//   },
//   divider: {
//     width: "100%",
//     height: 1,
//     backgroundColor: "#999999",
//     margin: "24px 0 24px 0",
//   },
//   paragraph: {
//     fontSize: 16,
//     color: "#212935",
//     lineHeight: 1.67,
//   },
//   amount: {
//     flexDirection: "column",
//     alignItems: "center",
//     border: "2px solid #999999",
//     padding: 12,
//     borderRadius: 2,
//   },
//   columnParent: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   columnStart: {
//     flex: 1,
//   },
//   columnEnd: {
//     flex: 1,
//     alignItems: "flex-end",
//   },
//   tableHeader: {
//     width: "100%",
//     alignItems: "center",
//     flexDirection: "row",
//     border: "2px solid #999999",
//     backgroundColor: "#a6a6a6",
//     fontSize: 16,
//   },
//   tableHeaderDescription: {
//     width: "100%",
//     paddingHorizontal: 6,
//     paddingVertical: 8,
//     textAlign: "left",
//   },
//   tableHeaderRate: {
//     paddingHorizontal: 6,
//     paddingVertical: 8,
//     borderLeft: "2px solid #999999",
//     width: 150,
//     textAlign: "right",
//   },
//   tableHeaderAmount: {
//     paddingHorizontal: 6,
//     paddingVertical: 8,
//     borderLeft: "2px solid #999999",
//     width: 220,
//     textAlign: "right",
//   },
//   tableChild: {
//     width: "100%",
//     alignItems: "center",
//     flexDirection: "row",
//     border: "2px solid #999999",
//     borderTop: "none",
//   },
//   tableChildDescription: {
//     width: "100%",
//     paddingHorizontal: 6,
//     paddingVertical: 8,
//     textAlign: "left",
//   },
//   tableChildRate: {
//     paddingHorizontal: 6,
//     paddingVertical: 8,
//     borderLeft: "2px solid #999999",
//     width: 150,
//     textAlign: "right",
//   },
//   tableChildAmount: {
//     paddingHorizontal: 6,
//     paddingVertical: 8,
//     borderLeft: "2px solid #999999",
//     borderBottom: "2px solid #999999",
//     width: 220,
//     textAlign: "right",
//   },
//   tableTotal: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "flex-end",
//   },
//   tableTotalTitle: {
//     width: 151,
//     paddingHorizontal: 6,
//     paddingVertical: 8,
//     textAlign: "right",
//     borderLeft: "2px solid #999999",
//     borderBottom: "2px solid #999999",
//     fontWeight: 700,
//   },
//   tableTotalAmount: {
//     width: 223,
//     paddingHorizontal: 6,
//     paddingVertical: 8,
//     textAlign: "right",
//     borderLeft: "2px solid #999999",
//     borderBottom: "2px solid #999999",
//     borderRight: "2px solid #999999",
//   },
//   payment: {
//     flexDirection: "column",
//     marginVertical: 34,
//   },
//   paymentTitle: {
//     fontSize: 20,
//     fontWeight: 700,
//     marginBottom: 8,
//   },
//   paymentInfo: {
//     marginBottom: 6,
//   },
//   thanks: {
//     textAlign: "center",
//   },
// });

// type InvoicePDFProps = Invoice & {
//   Items: Item[];
// };

// const InvoicePDF = ({invoice}: {invoice: InvoicePDFProps}) => {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <View style={styles.columnParent}>
//             <View style={styles.columnStart}>
//               <Text style={styles.heading}>Benjamín von Potobsky</Text>
//               <Text style={styles.paragraph}>ABN: 12543141</Text>
//             </View>

//             <View style={styles.columnEnd}>
//               <Text style={styles.heading}>INVOICE</Text>
//               <Text style={styles.paragraph}>{format(invoice.date, "PPP")}</Text>
//             </View>
//           </View>

//           <View style={styles.divider}></View>
//           <View style={styles.columnParent}>
//             <View style={styles.columnStart}>
//               <Text style={styles.statement}>Bill to: </Text>
//               <Text style={styles.paragraph}>{invoice.clientName}</Text>
//             </View>

//             <View style={styles.columnEnd}>
//               <View style={styles.amount}>
//                 <Text style={styles.paragraph}>Amount</Text>
//                 <Text style={styles.statement}>${getTotalInvoiceAmount(invoice.Items)}</Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.divider}></View>

//           <View style={styles.tableHeader}>
//             <Text style={styles.tableHeaderDescription}>Description</Text>
//             <Text style={styles.tableHeaderAmount}>Amount/hours</Text>
//             <Text style={styles.tableHeaderRate}>Price/Rate</Text>
//           </View>

//           {invoice.Items.map((item) => (
//             <View style={styles.tableChild} key={item.id}>
//               <Text style={styles.tableChildDescription}>{item.name}</Text>
//               <Text style={styles.tableHeaderAmount}>{item.quantity}</Text>
//               <Text style={styles.tableHeaderRate}>${item.price}</Text>
//             </View>
//           ))}

//           <View style={styles.tableTotal}>
//             {/* <Text style={styles.tableChildDescription}></Text> */}
//             <Text style={styles.tableTotalTitle}>Total Due</Text>
//             <Text style={styles.tableTotalAmount}>${getTotalInvoiceAmount(invoice.Items)}</Text>
//           </View>

//           <View style={styles.payment}>
//             <Text style={styles.paymentTitle}>Payment Details:</Text>
//             <Text style={styles.paymentInfo}>Account name: Benjamin von Potobsky</Text>
//             <Text style={styles.paymentInfo}>BSB: 000 - 212</Text>
//             <Text style={styles.paymentInfo}>Account number: 1243 - 1232</Text>
//           </View>

//           <Text style={styles.thanks}>If you have any questions, please do not hesitate in contacting me.</Text>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default InvoicePDF;
