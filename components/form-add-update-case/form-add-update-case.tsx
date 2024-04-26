'use client';

import React, {
  useRef,
  useMemo,
  FormEvent,
  SyntheticEvent,
  useState,
} from 'react';
import styles from './form-add-update-case.module.scss';
import { PostType } from '@/types/post-type';
import { DataItem, Area } from '../../app/const';
import { toast } from 'react-hot-toast';
import AllImages from '../all-images/all-images';
import addPost from '@/api-actions/add-post';
import { usePostsStore } from '@/store/posts-store';
import { isValidURL } from '@/app/utils';

interface Props {
  posts: PostType[];
}

export default function FormAddUpdateCase({ posts }: Props) {
  const idRef = useRef<HTMLInputElement | null>(null);
  const itemRef = useRef<HTMLTextAreaElement | null>(null);
  const [formData, setFormData] = useState<PostType>({
    id: '',
    title: '',
    area: '',
    previewImageSrc: '',
    description: '',
    items: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [caseItemsCount, setCaseItemsCount] = useState(1);
  const [itemType, setItemType] = useState<string>(DataItem.Text);
  const [itemText, setItemText] = useState('');
  const [itemSrc, setItemSrc] = useState('');
  const [isItemInputRequired, setIsItemInputRequired] = useState(false);

  const getAllPosts = usePostsStore((state) => state.getAllPosts);

  const memoizedAllImages = useMemo(
    () => <AllImages postId={formData.id} />,
    [formData.id]
  );

  // clear form fields
  const clearForm = () => {
    setFormData({
      id: '',
      title: '',
      area: '',
      previewImageSrc: '',
      description: '',
      items: [],
    });
    setItemText('');
    setItemSrc('');
  };

  // check case exists --------------------------------------------------------------------------------------------------------
  const checkCaseExists = async () => {
    if (idRef.current && idRef.current.value !== '') {
      const currentCase = posts.find(
        (item) => item.id === idRef.current?.value
      );

      if (currentCase?.id) {
        setIsUpdate(true);
        setFormData({
          id: currentCase.id || '',
          title: currentCase.title || '',
          area: currentCase.area || '',
          previewImageSrc: currentCase.previewImageSrc || '',
          description: currentCase.description || '',
          items: currentCase.items,
        });
      } else {
        setIsUpdate(false);
        setFormData({
          id: idRef.current.value || '',
          title: '',
          area: '',
          previewImageSrc: '',
          description: '',
          items: [],
        });
      }
    } else {
      setIsUpdate(false);
      clearForm();
    }
  };

  // form handlers ----------------------------------------------------------------------------------------------------------------
  const handleAddUpdateFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const isPreviewImageUrlValid = isValidURL(formData.previewImageSrc);

    if (!isPreviewImageUrlValid) {
      return toast.error('preview image url not exists');
    }

    if (formData.items.length > 0) {
      const isItemsUrlValid = formData.items.some((item) =>
        item && item.src ? isValidURL(item.src) : item.type === 'text'
      );

      if (!isItemsUrlValid) {
        return toast.error('some of items url not exists');
      }
    }

    setIsLoading(true);
    await addPost(formData);
    setIsLoading(false);
    // clear state data
    clearForm();
    getAllPosts();
    // show success message
    toast.success(`case successfully ${isUpdate ? 'update' : 'added'}`);
  };

  const handleIdChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    // validate input id as number
    const valueToNumber = Math.ceil(
      Math.abs(parseFloat(evt.currentTarget.value))
    );
    // value to string
    const validatedValue =
      isNaN(valueToNumber) || valueToNumber === 0
        ? ''
        : valueToNumber.toString();
    setFormData({ ...formData, id: validatedValue });

    checkCaseExists();
  };

  const handleTitleChange = (evt: SyntheticEvent<HTMLInputElement>) =>
    setFormData({ ...formData, title: evt.currentTarget.value });

  const handleAreaChange = (evt: SyntheticEvent<HTMLInputElement>) =>
    setFormData({ ...formData, area: evt.currentTarget.value });

  const handlePreviewSrcChange = (evt: SyntheticEvent<HTMLInputElement>) =>
    setFormData({ ...formData, previewImageSrc: evt.currentTarget.value });

  const handleDescriptionChange = (evt: SyntheticEvent<HTMLTextAreaElement>) =>
    setFormData({ ...formData, description: evt.currentTarget.value });

  const handleItemTypeChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    setItemType(evt.currentTarget.value);
  };

  const handleTextChange = (evt: SyntheticEvent<HTMLTextAreaElement>) => {
    if (itemRef.current?.value.trim() === '' || isItemInputRequired === true) {
      setIsItemInputRequired(false);
    }
    setItemText(evt.currentTarget.value);
  };

  const handleSrcChange = (evt: SyntheticEvent<HTMLTextAreaElement>) => {
    if (itemRef.current?.value.trim() === '' || isItemInputRequired === true) {
      setIsItemInputRequired(false);
    }
    setItemSrc(evt.currentTarget.value);
  };

  const handleAddItemClick = () => {
    if (itemRef.current?.value.trim() === '') {
      return setIsItemInputRequired(true);
    }

    setCaseItemsCount(caseItemsCount + 1);
    if (itemType === DataItem.Text) {
      setFormData({
        ...formData,
        items: [...formData.items, { type: itemType, text: itemText }],
      });
    } else {
      setFormData({
        ...formData,
        items: [...formData.items, { type: itemType, src: itemSrc }],
      });
    }
    setItemText('');
    setItemSrc('');
    setItemType(DataItem.Text);
  };

  // remove case items to formData items array
  const handleRemoveItemClick = (index: number) =>
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });

  const handleClearFormClick = () => clearForm();

  // JSX -----------------------------------------------------------------------------------------------------------------------------
  return (
    <div className={styles.add_case}>
      <form onSubmit={handleAddUpdateFormSubmit} id='form1' autoComplete='off'>
        <fieldset className={styles.add_case__form}>
          <legend>ADD CASE</legend>
          <label>
            ID
            <input
              ref={idRef}
              className={styles.input}
              onChange={handleIdChange}
              type='text'
              name='title'
              value={formData.id}
              required
            />
          </label>
          <label>
            Title
            <input
              className={styles.input}
              onChange={handleTitleChange}
              type='text'
              name='title'
              value={formData.title}
              required
            />
          </label>
          <label>
            Area
            <input
              className={styles.input}
              onChange={handleAreaChange}
              type='text'
              list='areas'
              value={formData.area}
              required
            />
            <datalist id='areas'>
              {Object.values(Area).map((area, index) => {
                return <option key={area + index}>{area}</option>;
              })}
            </datalist>
          </label>
          <label>
            Preview Image Src
            <input
              className={styles.input}
              onChange={handlePreviewSrcChange}
              type='text'
              name='previewImageSrc'
              value={formData.previewImageSrc}
              required
            />
          </label>
          <label>
            Description
            <textarea
              className={styles.input}
              onChange={handleDescriptionChange}
              name='description'
              value={formData.description}
              required
            />
          </label>

          {memoizedAllImages}

          {/* ADD CASE ITEMS */}
          <fieldset className={styles.add_items}>
            <fieldset>
              <legend>items type</legend>

              <div className={styles.input__item}>
                <input
                  onChange={handleItemTypeChange}
                  type='radio'
                  id='text'
                  name='type'
                  value='text'
                  checked={itemType === 'text'}
                  disabled={isLoading}
                />
                <label htmlFor='text'>text</label>
              </div>

              <div className={styles.input__item}>
                <input
                  onChange={handleItemTypeChange}
                  type='radio'
                  id='video'
                  name='type'
                  value='video'
                  checked={itemType === 'video'}
                  disabled={isLoading}
                />
                <label htmlFor='video'>video</label>
              </div>

              <div className={styles.input__item}>
                <input
                  onChange={handleItemTypeChange}
                  type='radio'
                  id='image'
                  name='type'
                  value='image'
                  checked={itemType === 'image'}
                  disabled={isLoading}
                />
                <label htmlFor='image'>image</label>
              </div>
            </fieldset>

            {itemType === 'text' ? (
              <div>
                <label>
                  text
                  <textarea
                    style={{ borderColor: isItemInputRequired ? 'red' : '' }}
                    ref={itemRef}
                    onChange={handleTextChange}
                    className={styles.input}
                    name='text'
                    value={itemText}
                    disabled={isLoading}
                  />
                </label>
                {isItemInputRequired && <p>REQUIRED FIELD</p>}
              </div>
            ) : (
              <div>
                <label>
                  src
                  <textarea
                    ref={itemRef}
                    onChange={handleSrcChange}
                    className={styles.input}
                    name='src'
                    value={itemSrc}
                    disabled={isLoading}
                  />
                </label>
                {isItemInputRequired && <p>REQUIRED FIELD</p>}
              </div>
            )}

            <button
              className={styles.add_item_button}
              onClick={handleAddItemClick}
              type='button'
              disabled={isLoading}
            >
              add item
            </button>
          </fieldset>
          <button
            onClick={handleClearFormClick}
            className={styles.add_item_button}
            type='button'
            disabled={isLoading}
          >
            CLEAR FORM
          </button>
          <input
            className={styles.submit_button}
            type='submit'
            value={isUpdate ? 'UPDATE CASE' : 'ADD CASE'}
            disabled={isLoading}
          />
        </fieldset>
      </form>

      {/* LIST OF CASE ITEMS */}
      <div className={styles.items_preview}>
        <p>ITEMS:</p>
        <div>
          <ul>
            {formData.items.map((item, index) => (
              <React.Fragment key={index}>
                <li>
                  {index + 1}. {JSON.stringify(item)}
                </li>
                <button onClick={() => handleRemoveItemClick(index)}>
                  remove
                </button>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
