import { useEffect, useState } from 'react';

/**
 * Creates and manages an object URL for a File, automatically revoking it on cleanup
 * to prevent memory leaks.
 */
export function useObjectUrl(file: File | null): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    // Cleanup: revoke the object URL when the file changes or component unmounts
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return url;
}
