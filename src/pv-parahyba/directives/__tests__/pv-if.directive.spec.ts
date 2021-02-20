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
  describe('A', () => {
    test('displays the element on the screen', () => {
      const [template] = mount({
        state: { A: true },
        value: 'A',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('removes the element on the screen', () => {
      const [template] = mount({
        state: { A: false },
        value: 'A',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('!A', () => {
    test('displays the element on the screen', () => {
      const [template] = mount({
        state: { A: false },
        value: '!A',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('hide element when state is true dened', () => {
      const [template] = mount({
        state: { A: true },
        value: '!A',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('A && B', () => {
    test('displays the element on the screen', () => {
      const [template] = mount({
        state: {
          A: true,
          B: true,
        },
        value: 'A && B',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('hide element when and an is false', () => {
      const [template] = mount({
        state: {
          A: false,
          B: true,
        },
        value: 'A && B',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('A || B', () => {
    test('displays the element on the screen', () => {
      const [template] = mount({
        state: {
          A: true,
          B: false,
        },
        value: 'A || B',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('show element when or all is false', () => {
      const [template] = mount({
        state: {
          A: false,
          B: false,
        },
        value: 'A || B',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('!A && B', () => {
    test('displays the element on the screen', () => {
      const [template] = mount({
        state: {
          A: false,
          B: true,
        },
        value: '!A && B',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('hide element when a and is true', () => {
      const [template] = mount({
        state: {
          A: false,
          B: false,
        },
        value: '!A && B',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('A && !B', () => {
    test('displays the element on the screen', () => {
      const [template] = mount({
        state: {
          A: true,
          B: false,
        },
        value: 'A && !B',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('hide element when a and is true', () => {
      const [template] = mount({
        state: {
          A: true,
          B: true,
        },
        value: 'A && !B',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('!A || B', () => {
    test('displays the element on the screen', () => {
      const [template] = mount({
        state: {
          A: false,
          B: false,
        },
        value: '!A || B',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('hide element when a and is true', () => {
      const [template] = mount({
        state: {
          A: true,
          B: false,
        },
        value: '!A || B',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('A || !B', () => {
    test('displays the element on the screen', () => {
      const [template] = mount({
        state: {
          A: false,
          B: false,
        },
        value: 'A || !B',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('hide element when a and is true', () => {
      const [template] = mount({
        state: {
          A: false,
          B: true,
        },
        value: 'A || !B',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('A && B || C', () => {
    test('displays the element on the screen', () => {
      const [template] = mount({
        state: {
          A: false,
          B: true,
          C: true,
        },
        value: 'A && B || C',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('hide element when a and is true', () => {
      const [template] = mount({
        state: {
          A: false,
          B: true,
          C: false,
        },
        value: 'A && B || C',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('A || B && C', () => {
    test('displays the element on the screen', () => {
      const [template] = mount({
        state: {
          A: false,
          B: true,
          C: true,
        },
        value: 'A || B && C',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('hide element when a and is true', () => {
      const [template] = mount({
        state: {
          A: false,
          B: true,
          C: false,
        },
        value: 'A || B && C',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('!A && B || C', () => {
    test('displays the element on the screen', () => {
      const [template] = mount({
        state: {
          A: false,
          B: false,
          C: true,
        },
        value: '!A && B || C',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('hide element when all is true', () => {
      const [template] = mount({
        state: {
          A: true,
          B: true,
          C: false,
        },
        value: '!A && B || C',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });

  describe('A && !B || C', () => {
    test('displays the element on the screen', () => {
      const [template] = mount({
        state: {
          A: true,
          B: false,
          C: true,
        },
        value: 'A && !B || C',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).toContainElement($target);
    });

    test('hide element when all is true', () => {
      const [template] = mount({
        state: {
          A: true,
          B: true,
          C: false,
        },
        value: 'A && !B || C',
      });
      const $target = queryByTestId(template, 'target');
      expect(template).not.toContainElement($target);
    });
  });
});
