import { Block } from './../../utils/Block.js';
import { default as profileTemplate } from './Profile.html.js';
import { Custom } from "../../blocks/Custom/Custom.js";
import { Input } from "../../blocks/Input/Input.js";
import { Button } from "../../blocks/Button/Button.js";
import { Modal } from "../../blocks/Modal/Modal.js";
import { Form } from "../../blocks/Form/Form.js";

type ProfileProps = {
  attr?: {
    className?: string
  };
  uploadAvatarProfileHandler?: Function;
  uploadAvatarModalHandler?: Function;
  goBackButton?: Block;
  avatar?: string;
  avatarHoverStyle?: string;
  title?: string | Block[];
  profileContent?: string | Block;
  profileModals?: Block;
}
export class Profile extends Block {

  constructor(props: ProfileProps = {}) {
    super('div', props, profileTemplate);
  }

  render(template: string, props: ProfileProps) {
    const { uploadAvatarModalHandler } = props
    let { uploadAvatarProfileHandler } = props
    const profileModals = new Custom({
      content: ''
    });
    const updateAvatarModal = this._updateAvatarModal(profileModals, uploadAvatarModalHandler);

    if (!uploadAvatarProfileHandler) {
      uploadAvatarProfileHandler = () => {
        updateAvatarModal.show();
      }
    }

    props = {
      ...props,
      profileModals,
      uploadAvatarProfileHandler
    }

    return { template, props }
  }

  _updateAvatarModal(modal_context: Block, uploadAvatarModalHandler?: Function) {
    const updateAvatarInput = new Input({
      name: 'avatar', type: 'file',
      methods: {
        click: (event: Event) => {
          event.stopPropagation();
        }
      }
    });
    const updateAvatarButton = new Button({
      className: ['button', 'button_primary', 'button_fullwidth', 'mt20'].join(' '), type: 'submit', content: 'Изменить',
      methods: {
        click: (event) => {
          if (uploadAvatarModalHandler) uploadAvatarModalHandler(event, modalForm, modal);
        }
      }
    });
    const modalForm = new Form({ attr: { className: 'form', method: 'POST' }, content: [ updateAvatarInput, updateAvatarButton ] })
    const modal = new Modal({
      caller_context: modal_context,
      header: 'Изменить аватар',
      modalContent: modalForm
    });
    return modal;
  }

}
