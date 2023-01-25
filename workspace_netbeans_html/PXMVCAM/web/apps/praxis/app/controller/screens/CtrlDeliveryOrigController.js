Ext.define('Ext.Praxis.controller.screens.CtrlDeliveryOrigController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CtrlDeliveryOrigController',
    p: '',
    init: function(view) {
        this.p = this.view.params;
        prototype.DeliveryOrig = {
            id: 'CtrlDeliveryOrigForm',
            url: CONTEXTPATH+'/CtrlDeliveryOrig'
        };
    },
    afterRender: function() {
        console.log(Ext.getCmp(prototype.DeliveryOrig.id+'-idDelivery'));
        if (this.p.strVoid === 'V') {
            Ext.getCmp(prototype.DeliveryOrig.id+'-idDelivery').el.setStyle({backgroundImage: 'url(resources/img/icon/999x999/VOID_03_r1_c1.png)'});
        }
        Ext.getCmp(prototype.DeliveryOrig.id+'-txtTexto').setValue(this.p.strTexto);
    },
    btnView_clickHandler: function () {
        global.Msg({msg: 'Under Construction'});
    },
    btnClose_clickHandler:function(){
        this.view.close();
    }
});


