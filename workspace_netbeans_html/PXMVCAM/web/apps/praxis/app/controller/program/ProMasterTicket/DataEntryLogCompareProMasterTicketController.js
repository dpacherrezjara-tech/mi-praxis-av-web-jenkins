Ext.define('Ext.Praxis.controller.program.ProMasterTicket.DataEntryLogCompareProMasterTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryLogCompareProMasterTicketController',
    lstA2289FilterAC: new Array(),
    bean: {},
    init: function () {
    },
    afterRender: function() {
        console.log(this.lstA2289FilterAC);
        this.llenarData();
        console.log("1");
    },
    llenarData: function () {
        for(var i7 = 0; i7 < this.lstA2289FilterAC.length; i7++){
            this.bean = this.lstA2289FilterAC[i7];
            switch(i7){
                case 0:
                    Ext.getCmp(prototype.id+'-3-txtA1531TTARJ').setValue(this.bean.A1531TTARJ);
                    Ext.getCmp(prototype.id+'-3-txtA1531NREF').setValue(this.bean.A1531NREF.substr(0, 16));
                    Ext.getCmp(prototype.id+'-3-txtA1531CAPL').setValue(this.bean.A1531CAPL);
                    Ext.getCmp(prototype.id+'-3-txtA1531VFOP').setValue(win.formatDblNumber(this.bean.A1531VFOP) + ' ' + this.bean.A1531MFOP);
                    break;
                case 1:
                    Ext.getCmp(prototype.id+'-3-txtA1531TTARJ2').setValue(this.bean.A1531TTARJ);
                    Ext.getCmp(prototype.id+'-3-txtA1531NREF2').setValue(this.bean.A1531NREF.substr(0, 16));
                    Ext.getCmp(prototype.id+'-3-txtA1531CAPL2').setValue(this.bean.A1531CAPL);
                    Ext.getCmp(prototype.id+'-3-txtA1531VFOP2').setValue(win.formatDblNumber(this.bean.A1531VFOP) + ' ' + this.bean.A1531MFOP);
                    break;
                default:
                    break;
            } 
        }
    },
    btnClose_clickHandler: function () {
        this.view.close();
    },
});