/**
 * Desarrollado por Luis Remicio
 */
Ext.define('Ext.Praxis.controller.widgets.Examples.ExamplesController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.ExamplesController',

  /**
   * Constructor
   */

  init: function (view) {
    var me = this;

  },

  /**
   * Se ejecuta luego de haber cargado todos los componentes
   */
  afterRender: function () {
    // alert('Controlador cargado correctamente')

    // Ext.getCmp(prototype.id + '-btn-prorrate').fireEvent('click', {});
  },

  OnBeforeShow: function () {
    prototype.id = 'Examples';
    prototype.url = CONTEXTPATH + '/examples';
    prototype.widthContenedor = 1366;
    prototype.heightContenedor = 768;
  },

  /*onFacsimilBtnClick: function () {
    var win = new Ext.Praxis.view.viewticket.Facsimil.Facsimil({
      params: {
        
      }
    });
    win.show();
  },

  onProrrateBtnClick: function () {
    var win = new Ext.Praxis.view.viewticket.Prorrate.Prorrate({
      params: {
        
      }
    });
    win.show();
  },*/

});

