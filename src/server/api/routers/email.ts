import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";

import {Resend} from "resend";
import {env} from "~/env.mjs";
import InvoiceEmail from "~/emails-templates/invoice-email";

const resend = new Resend(env.RESEND_API_KEY);

export const emailRouter = createTRPCRouter({
  sendInvoice: protectedProcedure.mutation(async () => {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "bvonpotobsky@gmail.com",
      subject: "Invoice",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <html lang="en">

        <head data-id="__react-email-head">
          <style>
            @font-face {
              font-family: 'Roboto';
              font-style: normal;
              font-weight: 400;
              mso-font-alt: 'Verdana';
              src: url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
            }

            * {
              font-family: 'Roboto', Verdana;
            }
          </style>
        </head>
        <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Invoice<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
        </div>

        <body data-id="__react-email-body" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;background-color:#ffffff;margin-left:auto;margin-right:auto;max-width:640px">
          <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:32rem;width:100%;margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px;padding-left:1.25rem;padding-right:1.25rem;padding-top:2.5rem;padding-bottom:2.5rem">
            <tbody>
              <tr style="width:100%">
                <td>
                  <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td></td>
                        <td data-id="__react-email-column">
                          <h1 data-id="react-email-heading"><a href="http://localhost:3000" data-id="react-email-link" target="_blank" style="color:rgb(0,0,0);text-decoration:none">IMK</a></h1>
                        </td>
                        <td align="right" data-id="__react-email-column" style="display:table-cell">
                          <p data-id="react-email-text" style="font-size:32px;line-height:24px;margin:16px 0;font-weight:300;color:#888888">Invoice</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" data-id="react-email-section" style="border-collapse:collapse;border-spacing:0px;color:rgb(51,51,51);background-color:rgb(250,250,250);border-radius:3px;font-size:12px" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody>
              <tr>
                <td>
                  <table align="center" width="100%" data-id="react-email-row" style="height:46px" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td colSpan="2" data-id="__react-email-column">
                          <table align="center" width="100%" data-id="react-email-row" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <td data-id="__react-email-column" style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                                  <p data-id="react-email-text" style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">CLIENT EMAIL</p><a data-id="react-email-link" target="_blank" style="color:#15c;text-decoration:underline;font-size:12px;margin:0;padding:0;line-height:1.4">zeno.rocha@gmail.com</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table align="center" width="100%" data-id="react-email-row" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <td data-id="__react-email-column" style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                                  <p data-id="react-email-text" style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">INVOICE DATE</p>
                                  <p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;padding:0">June 8th, 2023</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table align="center" width="100%" data-id="react-email-row" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <td data-id="__react-email-column" style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                                  <p data-id="react-email-text" style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">ORDER ID</p><a data-id="react-email-link" target="_blank" style="color:#15c;text-decoration:underline;font-size:12px;margin:0;padding:0;line-height:1.4">clj1bw0u80001c6rfknfv0mqf</a>
                                </td>
                                <td data-id="__react-email-column" style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                                  <p data-id="react-email-text" style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">DOCUMENT NO.</p>
                                  <p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;padding:0">186623754793</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td colSpan="2" data-id="__react-email-column" style="padding-left:20px;border-style:solid;border-color:white;border-width:0px 1px 1px 0px;height:44px">
                          <p data-id="react-email-text" style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">BILLED TO</p>
                          <p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;padding:0">Visa .... 7461 (Apple Pay)</p>
                          <p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;padding:0">Zeno Rocha</p>
                          <p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;padding:0">2125 Chestnut St</p>
                          <p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;padding:0">San Francisco, CA 94123</p>
                          <p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;padding:0">USA</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" data-id="react-email-section" style="border-collapse:collapse;border-spacing:0px;color:rgb(51,51,51);background-color:rgb(250,250,250);border-radius:3px;font-size:12px;margin:30px 0 15px 0;height:24px" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody>
              <tr>
                <td>
                  <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:0;background:#fafafa;padding-left:10px;font-weight:500">Products / Services</p>
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-bottom:1rem">
            <tbody>
              <tr>
                <td></td>
                <td data-id="__react-email-column" style="padding-left:22px">
                  <p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;font-weight:600;padding:0">sasa</p><a href="https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc=us&amp;id=1497977514&amp;o=i&amp;type=Subscription%20Renewal" data-saferedirecturl="https://www.google.com/url?q=https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc%3Dus%26id%3D1497977514%26o%3Di%26type%3DSubscription%2520Renewal&amp;source=gmail&amp;ust=1673963081204000&amp;usg=AOvVaw2DFCLKMo1snS-Swk5H26Z1" data-id="react-email-link" target="_blank" style="color:rgb(0,112,201);text-decoration:none;font-size:12px">Write a Review</a><span style="margin-left:4px;margin-right:4px;color:rgb(51,51,51);font-weight:200">|</span><a href="https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/reportAProblem?a=1497977514&amp;cc=us&amp;d=683263808&amp;o=i&amp;p=29065684906671&amp;pli=29092219632071&amp;s=1" data-saferedirecturl="https://www.google.com/url?q=https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/reportAProblem?a%3D1497977514%26cc%3Dus%26d%3D683263808%26o%3Di%26p%3D29065684906671%26pli%3D29092219632071%26s%3D1&amp;source=gmail&amp;ust=1673963081204000&amp;usg=AOvVaw3y47L06B2LTrL6qsmaW2Hq" data-id="react-email-link" target="_blank" style="color:rgb(0,112,201);text-decoration:none;font-size:12px">Report a Problem</a>
                </td>
                <td align="right" data-id="__react-email-column" style="display:flex;width:100%;justify-content:flex-end">
                  <p class="" data-id="react-email-text" style="font-size:12px;line-height:24px;margin:0;font-weight:600;margin-left:5px">112</p>
                  <p class="" data-id="react-email-text" style="font-size:12px;line-height:24px;margin:0;font-weight:600;margin-left:5px">x</p>
                  <p data-id="react-email-text" style="font-size:12px;line-height:24px;margin:0;font-weight:600;margin-left:5px;padding-right:22px">$1.00</p>
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-bottom:1rem">
            <tbody>
              <tr>
                <td></td>
                <td data-id="__react-email-column" style="padding-left:22px">
                  <p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;font-weight:600;padding:0">12</p><a href="https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc=us&amp;id=1497977514&amp;o=i&amp;type=Subscription%20Renewal" data-saferedirecturl="https://www.google.com/url?q=https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc%3Dus%26id%3D1497977514%26o%3Di%26type%3DSubscription%2520Renewal&amp;source=gmail&amp;ust=1673963081204000&amp;usg=AOvVaw2DFCLKMo1snS-Swk5H26Z1" data-id="react-email-link" target="_blank" style="color:rgb(0,112,201);text-decoration:none;font-size:12px">Write a Review</a><span style="margin-left:4px;margin-right:4px;color:rgb(51,51,51);font-weight:200">|</span><a href="https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/reportAProblem?a=1497977514&amp;cc=us&amp;d=683263808&amp;o=i&amp;p=29065684906671&amp;pli=29092219632071&amp;s=1" data-saferedirecturl="https://www.google.com/url?q=https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/reportAProblem?a%3D1497977514%26cc%3Dus%26d%3D683263808%26o%3Di%26p%3D29065684906671%26pli%3D29092219632071%26s%3D1&amp;source=gmail&amp;ust=1673963081204000&amp;usg=AOvVaw3y47L06B2LTrL6qsmaW2Hq" data-id="react-email-link" target="_blank" style="color:rgb(0,112,201);text-decoration:none;font-size:12px">Report a Problem</a>
                </td>
                <td align="right" data-id="__react-email-column" style="display:flex;width:100%;justify-content:flex-end">
                  <p class="" data-id="react-email-text" style="font-size:12px;line-height:24px;margin:0;font-weight:600;margin-left:5px">12</p>
                  <p class="" data-id="react-email-text" style="font-size:12px;line-height:24px;margin:0;font-weight:600;margin-left:5px">x</p>
                  <p data-id="react-email-text" style="font-size:12px;line-height:24px;margin:0;font-weight:600;margin-left:5px;padding-right:22px">$12.00</p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr data-id="react-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea;margin:30px 0 0 0" />
          <table align="right" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody>
              <tr>
                <td></td>
                <td align="right" data-id="__react-email-column" style="display:table-cell">
                  <p data-id="react-email-text" style="font-size:10px;line-height:24px;margin:0;color:rgb(102,102,102);font-weight:600;padding:0px 0px 0px 0px;text-align:right;margin-right:0.5rem">TOTAL</p>
                </td>
                <td data-id="__react-email-column" style="height:48px;border-left:1px solid;border-color:rgb(238,238,238)"></td>
                <td data-id="__react-email-column" style="display:table-cell;width:90px">
                  <p data-id="react-email-text" style="font-size:16px;line-height:24px;margin:0px 20px 0px 0px;font-weight:600;white-space:nowrap;text-align:right">$256.00</p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr data-id="react-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea;margin:0 0 75px 0" />
          <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody>
              <tr>
                <td></td>
                <td align="center" data-id="__react-email-column" style="display:block;margin:40px 0 0 0">
                  <h3 data-id="react-email-heading">IMK</h3>
                </td>
              </tr>
            </tbody>
          </table>
          <p data-id="react-email-text" style="font-size:12px;line-height:24px;margin:8px 0 0 0;text-align:center;color:rgb(102,102,102)"><a href="https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/accountSummary?mt=8" data-id="react-email-link" target="_blank" style="color:#067df7;text-decoration:none">Account Settings</a> • <a href="https://www.apple.com/legal/itunes/us/sales.html" data-id="react-email-link" target="_blank" style="color:#067df7;text-decoration:none">Terms of Sale</a> • <a href="https://www.apple.com/legal/privacy/" data-id="react-email-link" target="_blank" style="color:#067df7;text-decoration:none">Privacy Policy </a></p>
          <p data-id="react-email-text" style="font-size:12px;line-height:24px;margin:25px 0 0 0;text-align:center;color:rgb(102,102,102)">Copyright © 2023 IMK Inc. <br /> <a href="https://www.apple.com/legal/" data-id="react-email-link" target="_blank" style="color:#067df7;text-decoration:none">All rights reserved</a></p>
        </body>

      </html>`,
      react: InvoiceEmail(),
    });

    return data;
  }),
});

// import type {NextApiRequest, NextApiResponse} from "next";
// import {EmailTemplate} from "../../components/EmailTemplate";
// import {env} from "~/env.mjs";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const data = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: "delivered@resend.dev",
//       subject: "Hello world",
//       html: "<strong>It works!</strong>",
//       react: EmailTemplate({firstName: "John"}),
//     });

//     res.status(200).json(data);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };
