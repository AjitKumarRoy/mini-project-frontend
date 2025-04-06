import React from "react";
import { Link } from "react-router-dom"; // If you need navigation

const TermsOfServicePage = () => {
  return (
    <div className="bg-gray-100 py-12 sm:py-16 lg:py-20 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-10">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
              Terms of Service
            </h1>
            <p className="text-sm text-gray-500">Last Updated: 4/4/2025</p>
          </header>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome to Easy Sheets!
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              These Terms of Service govern your access to and use of our web
              application, which allows users to interact with their Google
              Sheets and Drive via Google OAuth 2.0 integration. By accessing or
              using the Web Application, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you do not agree to these Terms, please do not use the Web
              Application.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By using Easy Sheets, you represent that:
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">You must not:</p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li className="mb-3">You are at least 13 years old.</li>
              <li className="mb-3">
                You have the legal capacity to enter into a binding agreement.
              </li>
              <li className="mb-3">
                You have read, understood, and agreed to these Terms and our{" "}
                <a
                  className="text-indigo-500 hover:underline"
                  href="https://www.ajitkumarroy.me/privacy-policy"
                  target="_blank"
                >
                  Privacy Policy
                </a>
                .
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Description of Service
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Easy Sheets is a productivity tool that integrates with Google
              Drive and Google Sheets through Google OAuth 2.0. It allows
              authenticated users to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li className="mb-3">View, create, and modify spreadsheets.</li>
              <li className="mb-3">
                Perform CRUD (Create, Read, Update, Delete) operations.
              </li>
              <li className="mb-3">
                Access spreadsheet data in a simplified UI optimized for mobile
                and web.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Using the App
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You’re not allowed to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li className="mb-3">
                Copy, modify, or reuse any part of the app or our trademarks.
              </li>
              <li className="mb-3">
                Try to extract the source code, translate, or make derivative
                versions of the app.
              </li>
              <li className="mb-3">
                Interfere with the app’s normal functioning, try to hack, or
                gain unauthorized access to any part of the app.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Account & Responsibilities
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you create an account:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li className="mb-3">
                You are responsible for maintaining the security of your login
                credentials.
              </li>
              <li className="mb-3">
                You must provide accurate and up-to-date information.
              </li>
              <li className="mb-3">
                Any misuse or unauthorized activity under your account is your
                responsibility.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may suspend or terminate your access if we find any violations
              of these terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Internet & Device Requirements
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Easy Sheets requires an active internet connection (Wi-Fi or
              mobile data). We are not responsible if the web application
              doesn’t function properly due to lack of connectivity or if your
              device is not charged.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Updates & Availability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We may update the web application from time to time to improve functionality
              or fix issues. These updates might be necessary for continued use.
              We also reserve the right to discontinue or suspend the web application at any
              time, without prior notice.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Google Integration & Permissions
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
            By using Easy Sheets, you grant us access to limited Google account data via OAuth 2.0, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li className="mb-3">
              Your Google profile (name, email, profile picture).
              </li>
              <li className="mb-3">
              Your Google Drive and Sheets metadata.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
            We use this data only to provide core app functionality. We do not use it for advertising or sell/share it with third parties.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
            Our use of Google data complies with the <a className="text-indigo-500 hover:underline" href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank">Google API Services User Data Policy</a>, including the Limited Use requirements.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
            To the fullest extent permitted by law, Easy Sheets shall not be liable for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li className="mb-3">
              Any indirect, incidental, special, or consequential damages.
              </li>
              <li className="mb-3">
              Any loss of data, business interruption, or damages arising out of the use or inability to use the App.
              </li>
              <li className="mb-3">
              Any unauthorized access to or alteration of your transmissions or data.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
            Use of the Web Application is at your own risk.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Disclaimer
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
            The Web Application is provided “as is” and “as available” without warranties of any kind, express or implied. We do not guarantee:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
              <li className="mb-3">
              That the Web Application will be error-free or uninterrupted.
              </li>
              <li className="mb-3">
              That the Web Application will meet your expectations or requirements.
              </li>
              <li className="mb-3">
              That data will always be available, retrievable, or safe from unauthorized access.
              </li>
            </ul>
          </section>

          {/* Add more sections from the previous Terms of Service content here, formatted for better readability */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Kokrajhar, Assam
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Changes to These Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
            We may update our Terms & Conditions from time to time. You are advised to review this page periodically. We will notify you of any major changes through the app or our website.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
            These terms are effective as of 4 April 2025.
            </p>
          </section>

          <footer className="mt-12 text-center text-gray-500">
            <p className="mb-2">
              © {new Date().getFullYear()} Easy Sheets. All rights reserved.
            </p>
            <Link
              to="mailto:easysheetsofficial@gmail.com"
              className="text-indigo-500 hover:underline"
            >
              Contact Us Regarding Terms
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
