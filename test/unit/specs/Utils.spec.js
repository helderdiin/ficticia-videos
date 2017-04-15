import {
  objParamToStringQueryParam,
  backSlashToBreakLine,
  normalizeTimeNumber,
} from '@/utils';

describe('Utils', () => {
  describe('objParamToStringQueryParam', () => {
    it('Deve retornar key=KEY_TESTE', () => {
      const params = { key: 'KEY_TESTE' };
      expect(objParamToStringQueryParam(params)).to.equal('key=KEY_TESTE');
    });

    it('Deve retornar key=KEY_TESTE&q=PESQUISA', () => {
      const params = { key: 'KEY_TESTE', q: 'PESQUISA' };
      expect(objParamToStringQueryParam(params)).to.equal('key=KEY_TESTE&q=PESQUISA');
    });

    it('Deve retornar key=KEY_TESTE˜!@#$&USER#ID=PESQUISA @.com', () => {
      const params = { key: 'KEY_TESTE˜!@#$&', 'USER#ID': 'PESQUISA @.com' };
      expect(objParamToStringQueryParam(params)).to.equal('key=KEY_TESTE%CB%9C!%40%23%24%26&USER%23ID=PESQUISA%20%40.com');
    });
  });

  describe('backSlashToBreakLine', () => {
    it('Deve retornar Lorem<br />ipsum', () => {
      expect(backSlashToBreakLine('Lorem\nipsum')).to.equal('Lorem<br />ipsum');
    });

    it('Deve retornar Lorem<br />ipsum<br /><br />dolor', () => {
      expect(backSlashToBreakLine('Lorem\nipsum\n\ndolor')).to.equal('Lorem<br />ipsum<br /><br />dolor');
    });

    it('Deve retornar Lorem<br />ipsum<br /><br />dolor<br /><br /><br />sit', () => {
      expect(backSlashToBreakLine('Lorem\nipsum\n\ndolor\n\n\nsit')).to.equal('Lorem<br />ipsum<br /><br />dolor<br /><br /><br />sit');
    });
  });

  describe('normalizeTimeNumber', () => {
    it('Deve retornar 00', () => {
      expect(normalizeTimeNumber(0)).to.equal('00');
    });

    it('Deve retornar 07', () => {
      expect(normalizeTimeNumber(7)).to.equal('07');
    });

    it('Deve retornar 13', () => {
      expect(normalizeTimeNumber(13)).to.equal('13');
    });

    it('Deve retornar 737', () => {
      expect(normalizeTimeNumber(737)).to.equal('737');
    });
  });
});
