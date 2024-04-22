'use client';

import styles from './all-images.module.scss';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import deleteImage from '@/api-actions/delete-image';
import downloadImages from '@/api-actions/download-images';
import { useEdgeStore } from '@/db/edgestore-provider';
import addImages from '@/api-actions/add-images';
import noImage from '../../public/images/icons/no-image.png';
import { validFileType } from '@/app/utils';
import Loader from '@/app/loading';

interface Props {
  postId: string;
}

export default function AllImages({ postId }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [urls, setUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | undefined>(undefined);
  const { edgestore } = useEdgeStore();

  const handleUploadImages = async () => {
    setIsLoading(true);
    await Promise.all(
      files.map(async (image) => {
        try {
          const response = await edgestore.publicFiles.upload({
            input: { category: postId },
            file: image,
          });
          urls.push(response.url);
        } catch (err) {
          toast.error('error uploading file');
        }
      })
    )
      .then(async () => {
        try {
          const response = await addImages(postId, urls);
          return response;
        } catch (error) {
          setTimeout(async () => {
            Promise.all(
              urls.map(async (url) => {
                try {
                  await edgestore.publicFiles.delete({
                    url,
                  });
                } catch (error) {
                  toast.error('error uploading file');
                }
              })
            ).catch((error) => {
              toast.error('error uploading file');
            });
          }, 600);
          toast.error('error uploading file');
        }
      })
      .catch(() => {
        toast.error('error uploading file');
      })
      .finally(() => {
        toast.success('successfully uploaded');
        setUrls([...urls]);
      });
    setIsLoading(false);
  };

  const handleLoadImages = async () => {
    if (!postId) {
      return toast.error('post ID is required');
    }
    setIsLoading(true);
    const urls = await downloadImages(postId);
    setIsLoading(false);
    setUrls(urls);
  };

  const removeImage = async (url: string, index: number) => {
    setIsLoading(true);

    await Promise.all([
      edgestore.publicFiles.delete({ url }),
      deleteImage(postId, url),
    ])
      .then(() => {
        urls.splice(index, 1);
        setUrls([...urls]);
        toast.success('success');
      })
      .catch((error) => {
        toast.error('error deleting file');
      });

    setIsLoading(false);
  };

  const clearImages = () => {
    setUrls([]);
    setFiles([]);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let isValidFiles;
    let fileSizes: number[] = [];

    if (postId === 'admin' && evt.target.files) {
      const currentFiles = Array.from(evt.target.files);
      setFiles([...files, ...currentFiles]);
      return;
    }

    if (evt.target.files && evt.target.files) {
      isValidFiles = Array.from(evt.target.files).every((file: File) =>
        validFileType(file)
      );
      Array.from(evt.target.files).every((file: File) =>
        fileSizes.push(file.size)
      );

      if (!isValidFiles && fileRef.current) {
        fileRef.current.value = '';
        toast.error('один або декілька файлів не валідні');
        return;
      }
    }
    if (fileRef.current && fileSizes.some((item) => item > 1000000)) {
      fileRef.current.value = '';
      toast.error(
        'один або декілька файлів занадто великі, виберіть файл менше 1 МБ'
      );
      return;
    }

    if (evt.target.files && isValidFiles) {
      const currentFiles = Array.from(evt.target.files);
      setFiles([...files, ...currentFiles]);
      return;
    }
  };

  return (
    <fieldset>
      <div>
        <div>
          <input
            className={styles.file__input}
            ref={fileRef}
            onChange={handleFileChange}
            type='file'
            id='image_uploads'
            name='image_uploads'
            accept='image/*'
            multiple
            disabled={isLoading}
          />
        </div>

        <Button onClick={handleUploadImages} disabled={isLoading}>
          Upload images
        </Button>
        <Button onClick={handleLoadImages} disabled={isLoading}>
          Load images
        </Button>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.all_images}>
            {urls.map((url, index) => {
              return (
                <div className={styles.container} key={url + index}>
                  <div className={styles.image_wrapper}>
                    <Image
                      className={styles.image}
                      src={url || noImage.src}
                      alt='storage image'
                      width={200}
                      height={200}
                      priority={true}
                    />
                  </div>
                  <div className={styles.buttons}>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(url);
                        setCopiedIndex(index);
                      }}
                      type='button'
                      disabled={isLoading}
                    >
                      {copiedIndex === index ? 'Copied' : 'Copy URL'}
                    </button>
                    <button
                      onClick={async () => removeImage(url, index)}
                      type='button'
                      disabled={isLoading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <button onClick={clearImages} type='button'>
          clear images
        </button>
      </div>
    </fieldset>
  );
}
