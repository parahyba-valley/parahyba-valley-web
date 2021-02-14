import { queryByTestId } from '@testing-library/dom';
import PVIf from '../pv-if.directive';

function createTemplate(value: string): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <p pv-if="${value}" data-testid="target">
      foo
    </p>
  `;
  return wrapper;
}

function mount(options?: any): any {
  const template = createTemplate(options.value);
  const instance = new PVIf({
    element: template.querySelector('p') as HTMLElement,
    scope: null,
    state: {},
    ...options,
  });
  return [template, instance];
}

describe('pv-if', () => {
  describe('basic', () => {
    test('show element when state is true', () => {
      const [template] = mount({
        state: { show: true },
        value: 'show',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('hide element when state is false', () => {
      const [template] = mount({
        state: { show: false },
        value: 'show',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('dened', () => {
    test('show element when state is false dened', () => {
      const [template] = mount({
        state: { show: false },
        value: '!show',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('hide element when state is true dened', () => {
      const [template] = mount({
        state: { show: true },
        value: '!show',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('and', () => {
    test('show element when and is true', () => {
      const [template] = mount({
        state: {
          havePermission: true,
          isLoaded: true,
        },
        value: 'havePermission && isLoaded',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('hide element when and an is false', () => {
      const [template] = mount({
        state: {
          havePermission: false,
          isLoaded: true,
        },
        value: 'havePermission && isLoaded',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });

    test('hide element when and all is false', () => {
      const [template] = mount({
        state: {
          havePermission: false,
          isLoaded: false,
        },
        value: 'havePermission && isLoaded',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('or', () => {
    test('show element when or an is true', () => {
      const [template] = mount({
        state: {
          isOwner: true,
          isPublic: false,
        },
        value: 'isOwner || isPublic',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('show element when or all is true', () => {
      const [template] = mount({
        state: {
          isOwner: true,
          isPublic: true,
        },
        value: 'isOwner || isPublic',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('show element when or all is false', () => {
      const [template] = mount({
        state: {
          isOwner: false,
          isPublic: false,
        },
        value: 'isOwner || isPublic',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('and or', () => {
    test('show element when all is true', () => {
      const [template] = mount({
        state: {
          hasData: true,
          isPublic: true,
          isAdmin: true,
        },
        value: 'hasData && isPublic || isAdmin',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('show element when a and is true', () => {
      const [template] = mount({
        state: {
          hasData: true,
          isPublic: true,
          isAdmin: false,
        },
        value: 'hasData && isPublic || isAdmin',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('show element when a and is true', () => {
      const [template] = mount({
        state: {
          hasData: true,
          isPublic: false,
          isAdmin: true,
        },
        value: 'hasData && isPublic || isAdmin',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('show element when a and is true', () => {
      const [template] = mount({
        state: {
          hasData: false,
          isPublic: true,
          isAdmin: true,
        },
        value: 'hasData && isPublic || isAdmin',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });

    test('show element when a and is true', () => {
      const [template] = mount({
        state: {
          hasData: false,
          isPublic: false,
          isAdmin: false,
        },
        value: 'hasData && isPublic || isAdmin',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('and dened', () => {
    test('show element when a and is true', () => {
      const [template] = mount({
        state: {
          isPrivate: false,
          isAdmin: true,
        },
        value: 'isAdmin && !isPrivate',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('show element when a and is true', () => {
      const [template] = mount({
        state: {
          isPrivate: false,
          isAdmin: true,
        },
        value: '!isPrivate && isAdmin',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });
  });

  describe('or dened', () => {
    test('show element when a and is true', () => {
      const [template] = mount({
        state: {
          isPrivate: true,
          isAdmin: false,
        },
        value: 'isAdmin || !isPrivate',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });

    test('show element when a and is true', () => {
      const [template] = mount({
        state: {
          isPrivate: true,
          isAdmin: false,
        },
        value: '!isPrivate || isAdmin',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('and or dened', () => {
    test('show element when all is true', () => {
      const [template] = mount({
        state: {
          hasData: true,
          isPublic: true,
          isAdmin: false,
        },
        value: '!hasData && isPublic || isAdmin',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });

    test('show element when all is true', () => {
      const [template] = mount({
        state: {
          hasData: true,
          isPublic: false,
          isAdmin: true,
        },
        value: 'hasData && !isPublic || isAdmin',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });
  });
});
