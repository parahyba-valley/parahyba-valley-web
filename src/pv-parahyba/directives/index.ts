import PVFor from '~/pv-parahyba/directives/pv-for.directive';
import PVIf from '~/pv-parahyba/directives/pv-if.directive';
import PVClick from '~/pv-parahyba/directives/pv-click.directive';

const directives : { [key: string]: any } = {
  'pvfor': PVFor,
  'pvif': PVIf,
  'pvclick': PVClick,
};

export default directives;
