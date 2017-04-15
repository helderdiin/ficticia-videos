import moment from 'moment';

import {
  getBestThumbnail,
  getDurationGroups,
  getVideoDuration,
  getShortViews,
  getFormatedDate,
} from '@/components/youtube';

moment.locale('pt');

describe('Youtube Component', () => {
  describe('Thumbnail', () => {
    let thumbnails;

    beforeEach(() => {
      thumbnails = {
        maxres: { url: 'maxres' },
        high: { url: 'high' },
        default: { url: 'default' },
      };
    });

    it('Deve retornar o maxres', () => {
      expect(getBestThumbnail(thumbnails)).to.equal('maxres');
    });

    it('Deve retornar o high', () => {
      delete thumbnails.maxres;

      expect(getBestThumbnail(thumbnails)).to.equal('high');
    });

    it('Deve retornar o default', () => {
      delete thumbnails.maxres;
      delete thumbnails.high;

      expect(getBestThumbnail(thumbnails)).to.equal('default');
    });

    it('Deve retornar o melhor thumbnail encontrado', () => {
      delete thumbnails.maxres;

      expect(getBestThumbnail(thumbnails)).to.equal('high');
    });
  });

  describe('DurationGroups', () => {
    it('Deve retornar 2 minutos e 20 segundos', () => {
      const groups = getDurationGroups('PT2M20S');
      expect(groups[0]).to.equal('2');
      expect(groups[1]).to.equal('20');
    });

    it('Deve retornar 2 minutos', () => {
      const groups = getDurationGroups('PT2M');
      expect(groups[0]).to.equal('2');
      expect(groups[1]).to.be.undefined;
    });

    it('Deve retornar 20 segundos', () => {
      const groups = getDurationGroups('PT20S');
      expect(groups[0]).to.be.undefined;
      expect(groups[1]).to.equal('20');
    });
  });

  describe('Duration', () => {
    it('Deve retornar 02:20', () => {
      expect(getVideoDuration('PT2M20S')).to.equal('02:20');
    });

    it('Deve retornar 02:00', () => {
      expect(getVideoDuration('PT2M')).to.equal('02:00');
    });

    it('Deve retornar 00:20', () => {
      expect(getVideoDuration('PT20S')).to.equal('00:20');
    });
  });

  describe('ShortViews', () => {
    it('Deve retornar 0', () => {
      expect(getShortViews(0)).to.equal('0');
    });

    it('Deve retornar 7', () => {
      expect(getShortViews(7)).to.equal('7');
    });

    it('Deve retornar 73', () => {
      expect(getShortViews(73)).to.equal('73');
    });

    it('Deve retornar 737', () => {
      expect(getShortViews(737)).to.equal('737');
    });

    it('Deve retornar 8k', () => {
      expect(getShortViews(8245)).to.equal('8k');
    });

    it('Deve retornar 13k', () => {
      expect(getShortViews(13569)).to.equal('13k');
    });
  });

  describe('FormatedDate', () => {
    it('Deve retornar 13 de agosto de 2002', () => {
      expect(getFormatedDate('2002-08-13T11:02:30.000Z')).to.equal('13 de Agosto de 2002');
    });

    it('Deve retornar 27 de janeiro de 1993', () => {
      expect(getFormatedDate('1993-01-27T11:00:30.000Z')).to.equal('27 de Janeiro de 1993');
    });

    it('Deve retornar 12 de março de 2016', () => {
      expect(getFormatedDate('2016-03-12T11:14:45.000Z')).to.equal('12 de Março de 2016');
    });
  });
});
