import PVFor from '~/pv-parahyba/directives/pv-for.directive';
import PVIf from '~/pv-parahyba/directives/pv-if.directive';
import PVIfNot from '~/pv-parahyba/directives/pv-if-not.directive';
import PVClick from '~/pv-parahyba/directives/pv-click.directive';

const directives : { [key: string]: any } = {
  'pvfor': PVFor,
  'pvif': PVIf,
  'pvifnot': PVIfNot,
  'pvclick': PVClick,
};

export default directives;
