import { DataItem } from '../../app/const';
import Picture from '../picture/picture';
import Text from '../text/text';
import Video from '../video/video';

type Props = {
  type: string;
  text?: string;
  src?: string;
};

export default function RenderCaseItem({ type, text, src }: Props) {
  switch (type) {
    case DataItem.Image:
      return <Picture src={src!} alt='case preview' />;

    case DataItem.Text:
      return <Text text={text || ''} />;

    case DataItem.Video:
      return <Video src={src!} />;

    default:
      '';
  }
}
