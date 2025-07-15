# Gravity Farms Petfood - Next.js Demo

A modern Next.js application demonstrating real-time feature flagging with LaunchDarkly and Vercel Flags SDK. This project showcases a hybrid approach to feature management with static site generation (SSG) and dynamic flag updates.

## 🚀 Features

- **Real-time Feature Flagging**: LaunchDarkly React Client SDK for dynamic flag updates
- **Static Site Generation**: Vercel Flags SDK for precomputed flag values
- **Persona System**: Interactive user persona selection for testing different user experiences
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Vercel Ready**: Optimized for deployment on Vercel

## 🏗️ Architecture

### Hybrid Feature Flag Approach
- **SSG with Vercel Flags SDK**: Precomputed flag values for static pages
- **LaunchDarkly React Client SDK**: Real-time flag updates and user context
- **Middleware Integration**: Dynamic URL rewriting with encoded flag values

### Key Components
- **PersonaModal**: Dropdown interface for selecting user personas
- **LaunchDarklyWrapper**: Context provider for LaunchDarkly integration
- **UserContext**: User state management with persona attributes
- **HeroSection**: Dynamic content based on feature flags

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Feature Flags**: LaunchDarkly React Client SDK + Vercel Flags SDK
- **Deployment**: Vercel (optimized)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd gravity-farms-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_KEY=your_launchdarkly_client_key
   LAUNCHDARKLY_SDK_KEY=your_launchdarkly_server_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### LaunchDarkly Setup

1. **Create a LaunchDarkly account** at [launchdarkly.com](https://launchdarkly.com)
2. **Create a new project** in LaunchDarkly
3. **Set up environment variables**:
   - `NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_KEY`: Client-side SDK key
   - `LAUNCHDARKLY_SDK_KEY`: Server-side SDK key

### Feature Flags

Create the following flags in your LaunchDarkly dashboard:

| Flag Key | Type | Description |
|----------|------|-------------|
| `hero-banner-text` | JSON | Hero section banner configuration |
| `number-of-days-trial` | Number | Trial period duration |
| `seasonal-sale-banner-text` | String | Seasonal banner text |
| `show-trial-button` | Boolean | Show/hide trial button |

### Persona System

The application includes 6 pre-built personas for testing:

1. **Kat Purrstein** (Cat, UK, Basic, PayPal)
2. **Bark Twain** (Dog, US, Premium, Credit Card)
3. **Fur-gus McFluff** (Dog, CA, Basic, Apple Pay)
4. **Whiskers LeChat** (Cat, FR, Premium, Bank)
5. **Sam Bothington** (Both, DE, Both, Google Pay)
6. **Pawsley Barkley** (Dog, US, Trial, Credit Card)

Each persona has different attributes that affect feature flag evaluation.

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically detect Next.js configuration

2. **Set environment variables in Vercel**
   - Go to your project settings in Vercel
   - Add the same environment variables as local development:
     - `NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_KEY`
     - `LAUNCHDARKLY_SDK_KEY`

3. **Deploy**
   - Vercel will automatically build and deploy your application
   - The app will be available at your Vercel URL

### Environment Variables for Vercel

Make sure to add these environment variables in your Vercel project settings:

```env
NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_KEY=your_launchdarkly_client_key
LAUNCHDARKLY_SDK_KEY=your_launchdarkly_server_key
```

## 🧪 Testing

### Feature Flag Testing

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Test personas**
   - Click "Log In" in the header
   - Select different personas from the dropdown
   - Observe how feature flags change based on persona attributes

4. **Debug information**
   - Visit `http://localhost:3000/[code]` for debug information
   - Check browser console for detailed logging

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [code]/            # Dynamic route for debug pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── AppContent.tsx     # Main content wrapper
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Site header with navigation
│   ├── HeroSection.tsx    # Hero section with dynamic content
│   ├── LaunchDarklyDebug.tsx # Debug component
│   ├── LaunchDarklyWrapper.tsx # LaunchDarkly provider
│   ├── PersonaModal.tsx   # Persona selection modal
│   └── SeasonalBanner.tsx # Seasonal banner component
├── context/               # React contexts
│   └── UserContext.tsx    # User state management
├── hooks/                 # Custom React hooks
│   ├── useLaunchDarklyContext.ts # LaunchDarkly context updater
│   └── useLaunchDarklyFlag.ts   # Feature flag hooks
├── lib/                   # Utility libraries
│   └── flags.ts           # Vercel Flags configuration
└── middleware.ts          # Next.js middleware
```

## 🔍 Debugging

### LaunchDarkly Debug

The application includes comprehensive debugging:

- **Browser Console**: Detailed logging of flag updates and user context
- **Debug Page**: Visit `http://localhost:3000/[code]` for flag information
- **LaunchDarklyDebug Component**: Real-time flag status display

### Common Issues

1. **Flags not loading**: Check LaunchDarkly client key and environment
2. **Persona not updating**: Check browser console for context update logs
3. **Build errors**: Ensure all environment variables are set

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [LaunchDarkly](https://launchdarkly.com) for feature flag management
- [Vercel](https://vercel.com) for deployment platform
- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for styling

---

**Note**: This is a demo application showcasing feature flag integration. For production use, ensure proper security measures and error handling are implemented.
