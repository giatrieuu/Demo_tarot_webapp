// errorHandler.ts
export const handleHttpErrors = (status: number) => {
    switch (status) {
      case 403:
        window.location.href = '/403';
        break;
      case 404:
        window.location.href = '/404';
        break;
      case 500:
        // window.location.href = '/500';
        break;
      default:
        break;
    }
  };
  