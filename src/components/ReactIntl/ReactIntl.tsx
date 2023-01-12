import { FC } from 'react'
import { FormattedMessage } from 'react-intl'

const ReactIntl: FC = (): JSX.Element => {
  return (
    <div>
      <h2>ReactIntl</h2>
      <FormattedMessage id="title">{(txt) => <h1>{txt}</h1>}</FormattedMessage>
      <FormattedMessage
        tagName="p"
        id="app.greeting"
        description="Greeting to welcome the user to the app"
        defaultMessage="Hello, <b>Eric</b> {link}"
        values={{
          b: (chunks) => <b>{chunks}</b>,
          link: <a href="#">Visit site</a>,
        }}
      />
      <FormattedMessage
        tagName="p"
        id="foo"
        defaultMessage="To buy a shoe, <a>visit our website</a> and <cta>buy a shoe</cta>"
        values={{
          a: (chunks) => (
            <a className="external_link" target="_blank" href="https://www.example.com/shoe">
              {chunks}
            </a>
          ),
          cta: (chunks) => <strong className="important">{chunks}</strong>,
        }}
      />
    </div>
  )
}

export default ReactIntl
