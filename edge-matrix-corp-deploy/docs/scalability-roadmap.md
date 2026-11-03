# Enterprise Scalability Roadmap

The Edge Matrix Corporation frontend is designed as a foundational architecture capable of expanding into a complex global enterprise platform.

## 1. CMS Integration (Headless Migration)
Currently, data is statically served from `src/constants/`.
* **The Path Forward:** The architecture is decoupled so that these constants can be seamlessly replaced by a data fetching layer connected to a Headless CMS (e.g., Sanity, Contentful, or Strapi).
* **Implementation:** We will utilize Next.js Server Components to execute `fetch()` requests directly against the CMS GraphQL/REST API during the build step. We will leverage Next.js `revalidate` tags to trigger Incremental Static Regeneration (ISR) whenever the marketing team publishes new content via CMS webhooks.

## 2. Global Internationalization (i18n)
To support multinational operations (San Francisco, London, Singapore):
* **Implementation:** We will integrate `next-intl` or Next.js native middleware.
* **Routing Strategy:** We will adopt sub-path routing (`/en-us/services`, `/ja-jp/services`). The static generation pipeline will loop through both the locales array and the `SERVICES` array to pre-build every page in every language.

## 3. Secure Enterprise Portals (Authentication)
Future phases require an "Executive Portal" for clients to view Digital Twin dashboards.
* **Implementation:** Integration with enterprise identity providers (Okta, Auth0, Microsoft Entra ID) using `next-auth` (Auth.js).
* **Architecture:** We will create a `src/app/(authenticated)/` route group. Layouts in this group will be secured by Server-Side authentication checks in Next.js Middleware, completely preventing unauthorized access to the client bundle.

## 4. API & Backend Orchestration
* **Implementation:** Instead of exposing backend microservices directly to the client, the Next.js `src/app/api/` Route Handlers will act as a secure BFF (Backend-for-Frontend) API Gateway.
* **Security:** The BFF will safely hold secret JWTs/API keys in server environment variables and communicate with external industrial data pipelines or Python machine learning clusters over secure VPCs, proxying sanitized JSON back to the React client.
