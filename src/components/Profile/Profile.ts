import { Block } from './../../utils/Block.js';
import { default as profileTemplate } from './Profile.html.js';

type ProfileProps = {
  attr?: {
    className?: string
  };
  uploadAvatarProfileHandler?: Function;
  goBackButton?: Block;
  avatar?: string;
  title?: string | Block[];
  profileContent?: string | Block; 
}
export class Profile extends Block {

  constructor(props: ProfileProps = {}) {
    super('div', props, profileTemplate);
  }

}
