import { GoogleTagManager } from '@next/third-parties/google'

const GoogleAnalytics = ({ ga_id }: { ga_id: string }) => {
  return <GoogleTagManager gtmId={ga_id} />
}

export default GoogleAnalytics