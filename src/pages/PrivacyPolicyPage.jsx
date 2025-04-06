import React from "react";
import { Link } from "react-router-dom"; // If you need navigation

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-100 py-12 sm:py-16 lg:py-20 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-10">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500">Last Updated: 4/4/2025</p>
          </header>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Privacy Matters
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We at Easy Sheets respects your privacy and is committed to
              protecting the personal information you share with us. This
              Privacy Policy explains how we collect, use, and safeguard your
              information when you use our web application, which integrates
              with Google APIs to provide spreadsheet functionality.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Easy Sheets requires users to log in with their Google account to
              allow access to Google Drive and spreadsheet services.
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li className="mb-3">
                <strong className="font-semibold text-gray-800">
                  Google Drive API:
                </strong>{" "}
                Easy Sheets requires users to allow Google Drive file scope. As
                Easy Sheets creates Google Sheets directly from the website, the
                files get created on Google Drive. Easy Sheets has access to
                only files created within the website.
              </li>
              <li className="mb-3">
                <strong className="font-semibold text-gray-800">
                  Google Sheets API:
                </strong>{" "}
                Easy Sheets requires users to allow spreadsheet scope. It is
                required to perform read and write operations to the
                sheets/files created within the app.
              </li>
              <li className="mb-3">
                <strong className="font-semibold text-gray-800">
                  Credential Access:
                </strong>{" "}
                The Google Drive and Google Sheets access provided by users is
                limited only to that specific user and is refreshed using
                practices provided by Google services.
              </li>
              <li className="mb-3">
                <strong className="font-semibold text-gray-800">
                  Security:
                </strong>{" "}
                We value your trust in providing us with your Personal
                Information, thus we strive to use commercially acceptable means
                of protecting it. But remember that no method of transmission
                over the internet, or method of electronic storage is 100%
                secure and reliable, and we cannot guarantee its absolute
                security.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the collected information strictly to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li className="mb-3">Authenticate users via Google OAuth 2.0</li>
              <li className="mb-3">
                Enable CRUD (Create, Read, Update, Delete) operations on Google
                Sheets
              </li>
              <li className="mb-3">
                Improve app functionality and user experience.
              </li>
              <li className="mb-3">
                Respond to user inquiries or support requests
              </li>
              <li className="mb-3">
                To develop new features, functionalities, and services.
              </li>
              <li className="mb-3">
                To troubleshoot technical issues and provide customer support.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not use your data for advertising or marketing purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Google API Services User Data Policy Compliance
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Easy Sheets' use of information received from Google APIs adheres
              to the{" "}
              <a
                className="text-indigo-500 hover:underline"
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong className="font-semibold text-gray-800">We:</strong>{" "}
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li className="mb-3">
                Do not transfer or share your Google data to third parties
              </li>
              <li className="mb-3">Do not use your data for advertising</li>
              <li className="mb-3">
                Do not store sensitive Google Drive or Sheets data on our
                servers beyond temporary cache (if any) necessary to operate the
                App
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Data Retention & Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We only retain data as long as necessary to provide the services.
              Any data stored is protected using industry-standard encryption
              and security practices. No method of transmission over the
              internet is 100% secure, but we take all reasonable measures to
              protect your data.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong className="font-semibold text-gray-800">You may:</strong>{" "}
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li className="mb-3">
                Revoke access to Easy Sheets from your{" "}
                <a
                  className="text-indigo-500 hover:underline"
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                >
                  Google Account Settings
                </a>
                .
              </li>
              <li className="mb-3">
                Contact us to delete any data we may have stored (usually
                minimal).
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Children’s Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Services do not address anyone under the age of 13. We do
              not knowingly collect personally identifiable information from
              children under 13 years of age. In the case we discover that a
              child under 13 has provided us with personal information, we
              immediately delete this from our servers. If you are a parent or
              guardian and you are aware that your child has provided us with
              personal information, please contact us so that we will be able to
              take necessary actions.
            </p>
          </section>


          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
            We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. This policy is effective as of 2025-04-04.
            </p>
          </section>

          {/* Add more sections from the previous Privacy Policy content here, formatted for better readability */}

          <footer className="mt-12 text-center text-gray-500">
            <p className="mb-2">
              © {new Date().getFullYear()} Easy Sheets. All rights reserved.
            </p>
            <Link
              to="mailto:easysheetsofficial@gmail.com"
              className="text-indigo-500 hover:underline"
            >
              Contact Us Regarding Privacy
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
