import {} from '@testing-library/react';

import { createMessage } from '.';
import { ERROR_CODE } from '../../utils/enum';

const PATTERN_MESSAGE = 'PATTERN_MESSAGE';
const REQUIRED_MESSAGE = 'REQUIRED_MESSAGE';

describe('error message test', () => {
  describe('createMessage logic', () => {
    it('should display the pattern message when error is pattern related', () => {
      const result = createMessage(ERROR_CODE.PATTERN_ERROR, REQUIRED_MESSAGE, PATTERN_MESSAGE);

      expect(result).toEqual(PATTERN_MESSAGE);
    });

    it('should display the required message when error is required related', () => {
      const result = createMessage(ERROR_CODE.REQUIRED_ERROR, REQUIRED_MESSAGE, PATTERN_MESSAGE);

      expect(result).toEqual(REQUIRED_MESSAGE);
    });
  });
});
