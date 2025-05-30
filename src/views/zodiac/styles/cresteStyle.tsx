import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
  fire: css`
    &.${prefixCls}-btn-default:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: var(--fire);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0.8;
      }
    }
  `,
  water: css`
    &.${prefixCls}-btn-default:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: var(--water);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0.8;
      }
    }
  `,
  air: css`
    &.${prefixCls}-btn-default:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: var(--air);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0.8;
      }
    }
  `,
  earth: css`
    &.${prefixCls}-btn-default:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: var(--earth);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0.8;
      }
    }
  `,
}));
export default useStyle;