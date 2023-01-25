Ext.define('Ext.Praxis.controller.program.ProMasterTicket.DataEntryADMProMasterTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryADMProMasterTicketController',
    gridDataMemoAC: [],
    evt: null,
    init: function () {
    },
    afterRender: function() {
        //Mostrar informacion en la grilla
        prototype.url03 = CONTEXTPATH + '/ADMReport';
        console.clear();
        console.log(this.gridDataMemoAC);
        Ext.getCmp(prototype.id+'-1-gridDataMemo').getStore().removeAll();
        
        var i, n = this.gridDataMemoAC.length;
        
        for(i=0;i<n;i++){
            Ext.getCmp(prototype.id+'-1-gridDataMemo').getStore().insert(i, this.gridDataMemoAC[i]);
        }
    },
    gridDataMemo_clickHandler: function (column, e, row, column2, x) {
        var preme = x.record.data.A2548PREME;
        alert("preme : " + preme); return;
        if(preme === '') return;
        
        var win = new Ext.Praxis.view.screens.ScrFormUnico({
            params: {
                action: 'SNCAMBIO',
                 VP_PREME: preme,
                //rec: rec,
                url01:prototype.url03
            }
        });
        win.show();
    }
});

