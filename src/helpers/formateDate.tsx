export const FormateDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',     // not '2-digit'
      month: 'numeric',   // not '2-digit'
      year: 'numeric',
    });
  };