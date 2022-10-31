import { defineMessages, FormattedMessage, useIntl } from "react-intl";

const texts = ["Luis", "Martinez", "2022/10/10"];

const types = ["firstName", "lastName", "date", "checkmark"] as const;

const TYPES = defineMessages({
  firstName: {
    id: "e0b2b2f2-0b1f-4b2f-8b1f-1b1f1b1f1b1f",
    defaultMessage: "First name",
  },
  lastName: {
    id: "6896ccac-3a81-4e50-8cb4-b8170a577cc7",
    defaultMessage: "Last name",
  },
  date: {
    id: "38d6f826-4e44-428b-a5fc-948ad3b341a9",
    defaultMessage: "Date",
  },
  checkmark: {
    id: "8c461298-b8a0-44fd-a62d-d57cb2468edd",
    defaultMessage: "Checkmark",
  },
});

const IntlWithValues = () => {
  const intl = useIntl();
  const getRandomText = () => texts[Math.floor(Math.random() * texts.length)];
  const getRandomType = () => types[Math.floor(Math.random() * types.length)];

  return (
    <>
      <div>
        <FormattedMessage
          id="b417ccfc-515c-4c58-90f0-7813400d9bb7"
          description="Sample annotation"
          defaultMessage="Current date is {date, date, ::yyyyMMdd}"
          values={{
            date: new Date("2022/10/10"),
          }}
        />
      </div>
      <div>
        <FormattedMessage
          id="430ed580-edd4-465f-8693-236b60c5c955"
          defaultMessage="Selected annotation {text} {type}."
          values={{
            text: getRandomText(),
            type: intl.formatMessage(TYPES[getRandomType()]),
          }}
        />
      </div>
      <div>
        {/* extra white space is trimmed automatically */}
        <FormattedMessage
          id="2ea4e5af-87dc-4cb6-acf3-ea092fc0dd79"
          defaultMessage="a {action} {type} {value} z"
          values={{
            action: "update",
            type: "name",
            value: "Luis",
          }}
        ></FormattedMessage>
      </div>
    </>
  );
};

export default IntlWithValues;
