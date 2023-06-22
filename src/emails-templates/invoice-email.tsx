import * as React from "react";

import {format} from "date-fns";

import {formatAsPrice} from "../lib/utils";

import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
  Font,
  Heading,
} from "@react-email/components";

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

// export const AppleReceiptEmail = ({invoice}: {invoice: InvoiceEmailPdf}) => {
export const InvoiceEmail = () => {
  const invoice = {
    id: "clj1bw0u80001c6rfknfv0mqf",
    clientName: "Everest",
    clientEmail: "akllasak@gmail.com",
    description: "121",
    date: new Date("2023-06-07T14:00:00.000Z"),
    paymentTermsDays: 90,
    dueDate: new Date("2023-09-05T14:00:00.000Z"),
    status: "draft",
    userId: "clj11qo470006c6hy8we81ka5",
    Items: [
      {
        id: "clj1bw0u80002c6rf3blilvpw",
        name: "sasa",
        quantity: 112,
        price: 1,
        description: null,
        invoiceId: "clj1bw0u80001c6rfknfv0mqf",
      },
      {
        id: "clj1bw0u80003c6rf46e40xta",
        name: "12",
        quantity: 12,
        price: 12,
        description: null,
        invoiceId: "clj1bw0u80001c6rfknfv0mqf",
      },
    ],
  };

  return (
    <Tailwind>
      <Html>
        <Head>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Invoice</Preview>

        <Body style={main} className="mx-auto max-w-screen-sm">
          {/* margin: "0 auto", padding: "20px 0 48px", width: "660px", */}
          <Container className="mx-auto my-0 w-full max-w-lg px-5 py-10" style={{width: "100%", maxWidth: 600}}>
            <Section>
              <Column>
                <Heading as="h1">
                  <Link href={baseUrl} className="text-black">
                    IMK
                  </Link>
                </Heading>
              </Column>

              <Column align="right" style={tableCell}>
                <Text style={heading}>Invoice</Text>
              </Column>
            </Section>

            <Section style={informationTable}>
              <Row style={informationTableRow}>
                <Column colSpan={2}>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>CLIENT EMAIL</Text>
                      <Link
                        style={{
                          ...informationTableValue,
                          color: "#15c",
                          textDecoration: "underline",
                        }}
                      >
                        zeno.rocha@gmail.com
                      </Link>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>INVOICE DATE</Text>
                      <Text style={informationTableValue}>{format(invoice.date, "PPP")}</Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>ORDER ID</Text>
                      <Link
                        style={{
                          ...informationTableValue,
                          color: "#15c",
                          textDecoration: "underline",
                        }}
                      >
                        {invoice.id}
                      </Link>
                    </Column>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>DOCUMENT NO.</Text>
                      {/* ToDo: Add ABN/TFN???? */}
                      <Text style={informationTableValue}>186623754793</Text>
                    </Column>
                  </Row>
                </Column>
                <Column style={informationTableColumn} colSpan={2}>
                  <Text style={informationTableLabel}>BILLED TO</Text>
                  <Text style={informationTableValue}>Visa .... 7461 (Apple Pay)</Text>
                  <Text style={informationTableValue}>Zeno Rocha</Text>
                  <Text style={informationTableValue}>2125 Chestnut St</Text>
                  <Text style={informationTableValue}>San Francisco, CA 94123</Text>
                  <Text style={informationTableValue}>USA</Text>
                </Column>
              </Row>
            </Section>
            <Section style={productTitleTable}>
              <Text style={productsTitle}>Products / Services</Text>
            </Section>
            {invoice.Items.map((item) => (
              <Section key={item.id} className="mb-4">
                <Column style={{paddingLeft: "22px"}}>
                  <Text style={productTitle}>{item.name}</Text>

                  <Link
                    href="https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc=us&amp;id=1497977514&amp;o=i&amp;type=Subscription%20Renewal"
                    style={productLink}
                    data-saferedirecturl="https://www.google.com/url?q=https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc%3Dus%26id%3D1497977514%26o%3Di%26type%3DSubscription%2520Renewal&amp;source=gmail&amp;ust=1673963081204000&amp;usg=AOvVaw2DFCLKMo1snS-Swk5H26Z1"
                  >
                    Write a Review
                  </Link>
                  <span style={divisor}>|</span>
                  <Link
                    href="https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/reportAProblem?a=1497977514&amp;cc=us&amp;d=683263808&amp;o=i&amp;p=29065684906671&amp;pli=29092219632071&amp;s=1"
                    style={productLink}
                    data-saferedirecturl="https://www.google.com/url?q=https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/reportAProblem?a%3D1497977514%26cc%3Dus%26d%3D683263808%26o%3Di%26p%3D29065684906671%26pli%3D29092219632071%26s%3D1&amp;source=gmail&amp;ust=1673963081204000&amp;usg=AOvVaw3y47L06B2LTrL6qsmaW2Hq"
                  >
                    Report a Problem
                  </Link>
                </Column>

                <Column align="right" className="flex w-full justify-end">
                  <Text className="" style={productPrice}>
                    {item.quantity}
                  </Text>
                  <Text className="" style={productPrice}>
                    x
                  </Text>
                  <Text className=" pr-[22px]" style={productPrice}>
                    ${formatAsPrice(item.price)}
                  </Text>
                </Column>
              </Section>
            ))}
            <Hr style={productPriceLine} />
            <Section align="right">
              <Column style={tableCell} align="right">
                <Text style={productPriceTotal} className="mr-2">
                  TOTAL
                </Text>
              </Column>
              <Column style={productPriceVerticalLine}></Column>
              <Column style={productPriceLargeWrapper}>
                <Text style={productPriceLarge}>${formatAsPrice(1214213)}</Text>
              </Column>
            </Section>
            <Hr style={productPriceLineBottom} />

            <Section>
              <Column align="center" style={footerIcon}>
                {/* <Img src={`${baseUrl}/static/apple-logo.png`} width="26" height="26" alt="Apple Card" /> */}
                <Heading as="h3">IMK</Heading>
              </Column>
            </Section>
            <Text style={footerLinksWrapper}>
              <Link href="https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/accountSummary?mt=8">
                Account Settings
              </Link>{" "}
              • <Link href="https://www.apple.com/legal/itunes/us/sales.html">Terms of Sale</Link> •{" "}
              <Link href="https://www.apple.com/legal/privacy/">Privacy Policy </Link>
            </Text>
            <Text style={footerCopyright}>
              Copyright © 2023 IMK Inc. <br /> <Link href="https://www.apple.com/legal/">All rights reserved</Link>
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default InvoiceEmail;

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const tableCell = {display: "table-cell"};

const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

const informationTableRow = {
  height: "46px",
};

const informationTableColumn = {
  paddingLeft: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  height: "44px",
};

const informationTableLabel = {
  ...resetText,
  color: "rgb(102,102,102)",
  fontSize: "10px",
};

const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

const productsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const productTitle = {fontSize: "12px", fontWeight: "600", ...resetText};

const productLink = {
  fontSize: "12px",
  color: "rgb(0,112,201)",
  textDecoration: "none",
};

const divisor = {
  marginLeft: "4px",
  marginRight: "4px",
  color: "rgb(51,51,51)",
  fontWeight: 200,
};

const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 0px 0px 0px",
  textAlign: "right" as const,
};

const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
  marginLeft: "5px",
};

const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};

const productPriceLine = {margin: "30px 0 0 0"};

const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = {display: "table-cell", width: "90px"};

const productPriceLineBottom = {margin: "0 0 75px 0"};

const footerIcon = {display: "block", margin: "40px 0 0 0"};

const footerLinksWrapper = {
  margin: "8px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

const footerCopyright = {
  margin: "25px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};
