import Alert from 'react-bootstrap/Alert';

type AlertBannerProps = {
  message?: string | null;
  variant?: string | null;
};

export const AlertBanner = ({ message, variant }: AlertBannerProps) => {
  const alertMessage = message || 'An unexpected error occurred. Please try again later.';
  const alertVariant = variant || 'danger';

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
      {alertMessage}
    </Alert>
  );
};
