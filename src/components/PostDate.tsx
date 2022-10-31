import { FormattedRelativeTime, useIntl } from "react-intl";

const MS_IN_DAY = 1e3 * 3600 * 24;

const PostDate = ({ date }: { date: Date }) => {
  const intl = useIntl();
  return (
    <div title={intl.formatDate(date)}>
      <FormattedRelativeTime
        value={(Date.now() - +date) / MS_IN_DAY}
        unit="day"
      />
    </div>
  );
};

export default PostDate;
