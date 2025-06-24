import chainCoing from '@/chainConfig';
import useStyles from '@/components/ChainIcon/useStyles';
import Image, { type ImageProps } from 'next/image';
import thorchainLogoLight from 'shared-utils/assets/logos/thorchain-light.png';
import thorchainLogoDark from 'shared-utils/assets/logos/thorchain-dark.png';

interface IconProps extends Omit<ImageProps, 'id' | 'src'> {
  type: 'icon' | 'logo';
  chainName?: string;
}

const ChainIcon = ({
  className,
  type,
  chainName = chainCoing().chainName,
  ...props
}: IconProps) => {
  const { classes, cx } = useStyles();

  let [iconDark, iconLight] = ['', ''];
  switch (chainName) {
    case 'thorchain':
      [iconDark, iconLight] =
        type === 'icon'
          ? [thorchainLogoDark, thorchainLogoDark]
          : [thorchainLogoLight, thorchainLogoLight];
      break;
    default:
      throw new Error(`chain ${chainName} not supported`);
  }
  return (
    <span className={cx(className, classes.container)}>
      <Image width={0} height={0} src={iconDark} {...props} className={classes.dark} unoptimized />
      <Image
        width={0}
        height={0}
        src={iconLight}
        {...props}
        className={classes.light}
        unoptimized
      />
    </span>
  );
};

export default ChainIcon;
