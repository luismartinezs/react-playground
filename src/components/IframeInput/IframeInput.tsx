import { FC } from 'react'

const IframeInput: FC = (): JSX.Element => {
  return (
    <div>
      <h2>IframeInput</h2>
      <iframe
        src="https://react-playground-luis.netlify.app/react-hook-form"
        title="react hook form"
        width="600"
        height="400"
      ></iframe>
    </div>
  )
}

export default IframeInput
