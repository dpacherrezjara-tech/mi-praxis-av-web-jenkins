Ext.define('Ext.Praxis.controller.program.CtrlTktBalanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CtrlTktBalanceController',
    bean: {},
    actionCode: 'V',
    lstTKT_Balance: new Array(),
    lstTKT_FOP: new Array(),
    lstTKT_TAX: new Array(),
    lstTKT_COMM: new Array(),
    lstTKT_TAXCOMM: new Array(),
    init: function(view) {
        prototype.TktBalance = {
            id: 'CtrlTktBalanceForm',
            url: CONTEXTPATH+'/CtrlTktBalance'
        };
    },
    afterRender: function() {
        this.loadBalance(this.bean);
    },
    loadBalance: function (bean) {
        var me01 = this;
        Ext.Ajax.request({
            url: CONTEXTPATH+'/CtrlTktFC/loadBalance',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp('CtrlTktBalanceForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('CtrlTktBalanceForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me01.onResultloadBalance(res);
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                Ext.getCmp('CtrlTktBalanceForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    loadRubros: function (IN_CIA, IN_FORMA, IN_SERIE, A1730SQ720) {
        var me02 = this;
        Ext.Ajax.request({
            url: CONTEXTPATH+'/CtrlTktFC/loadRubros',
            method: 'POST',
            timeout: 60000000,
            params: { cia: IN_CIA, forma: IN_FORMA, serie: IN_SERIE, seq: A1730SQ720 },
            beforerequest: Ext.getCmp('CtrlTktBalanceForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('CtrlTktBalanceForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me02.onResultLoadRubros(res);
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                Ext.getCmp('CtrlTktBalanceForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    onResultloadBalance: function (res) {
        this.lstTKT_Balance = res.lstTKT_Balance;
        var file = {};
        if(this.lstTKT_Balance.length > 0){
            file = this.lstTKT_Balance[0];
            Ext.getCmp(prototype.TktBalance.id+'-Indicator').hide();
            if(file.CANTIDAD < 1){
                Ext.getCmp(prototype.TktBalance.id+'-Code1').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC1').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax1').hide();
            }
            if(file.CANTIDAD < 2){
                Ext.getCmp(prototype.TktBalance.id+'-Code2').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC2').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax2').hide();
            }
            if(file.CANTIDAD < 3){
                Ext.getCmp(prototype.TktBalance.id+'-Code3').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC3').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax3').hide();
            }
            if(file.CANTIDAD < 4){
                Ext.getCmp(prototype.TktBalance.id+'-Code4').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC4').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax4').hide();
            }
            if(file.CANTIDAD < 5){
                Ext.getCmp(prototype.TktBalance.id+'-Code5').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC5').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax5').hide();
            }
            if(file.CANTIDAD < 6){
                Ext.getCmp(prototype.TktBalance.id+'-Code6').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC6').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax6').hide();
            }
            if(file.CANTIDAD < 7){
                Ext.getCmp(prototype.TktBalance.id+'-Code7').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC7').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax7').hide();
            }
            if(file.CANTIDAD < 8){
                Ext.getCmp(prototype.TktBalance.id+'-Code8').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC8').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax8').hide();
            }
            if(file.CANTIDAD < 9){
                Ext.getCmp(prototype.TktBalance.id+'-Code9').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC9').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax9').hide();
            }
            if(file.CANTIDAD < 10){
                Ext.getCmp(prototype.TktBalance.id+'-Code10').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC10').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax10').hide();
            }
            if(file.CANTIDAD < 11){
                Ext.getCmp(prototype.TktBalance.id+'-Code11').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC11').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax11').hide();
            }
            if(file.CANTIDAD < 12){
                Ext.getCmp(prototype.TktBalance.id+'-Code12').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC12').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax12').hide();
            }
            if(file.CANTIDAD < 13){
                Ext.getCmp(prototype.TktBalance.id+'-Code13').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC13').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax13').hide();
            }
            if(file.CANTIDAD < 14){
                Ext.getCmp(prototype.TktBalance.id+'-Code14').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC14').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax14').hide();
            }
            if(file.CANTIDAD < 15){
                Ext.getCmp(prototype.TktBalance.id+'-Code15').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC15').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax15').hide();
            }
            if(file.CANTIDAD < 16){
                Ext.getCmp(prototype.TktBalance.id+'-Code16').hide();
                Ext.getCmp(prototype.TktBalance.id+'-PFC16').hide();
                Ext.getCmp(prototype.TktBalance.id+'-Tax16').hide();
            }
            if(file.CANTIDAD > 16){
                Ext.getCmp(prototype.TktBalance.id+'-Indicator').show();
            }
        }else{
            global.Msg({msg: 'Data not found.'});
        }
        this.loadRubros(this.bean.IN_CIA,this.bean.IN_FORMA,this.bean.IN_SERIE,this.bean.A1730SQ720);
    },
    onResultLoadRubros: function (res) {
        this.lstTKT_FOP = res.lstTKT_FOP;
        this.lstTKT_TAX = res.lstTKT_TAX;
        this.lstTKT_COMM = res.lstTKT_COMM;
        this.lstTKT_TAXCOMM = res.lstTKT_TAXCOMM;
        var file1 = {};
        var file2 = {};
        var file3 = {};
        var file4 = {};
        var j = 0;
//        if(lstTKT_FOP.length > 0){
//            strTexto = 'Code Card Ref. Number         Cur ' + Util.fillString2('Amount',13) + ' \n';
//            for(j=0;j<lstTKT_FOP.length;j++){
//                    file1 = PX036S01A1531Filter(lstTKT_FOP.getItemAt(j));
//                    strTexto+=file1.A1531CFOP + '   ' + file1.A1531TTARJ + '   ' + file1.A1531NREF + ' ' + file1.A1531MFOP + ' ' +Util.fillString2(formatDblNumber.format(file1.A1531VFOP.toString()),13) + '\n';
//            }
//            txaFOP.text = strTexto;
//        }else{
//            txaFOP.text = '';
//        }
//        strTexto = '';
//        //TAX
//        if(lstTKT_TAX.length > 0){
//            strTexto = 'Code APF Cur ' + Util.fillString2('Amount',13) + ' \n';
//            for(j=0;j<lstTKT_TAX.length;j++){
//                    file2 = PX036S01A1532Filter(lstTKT_TAX.getItemAt(j));
//                    strTexto+=file2.A1532CTAX + '  ' + file2.A1532APFC + ' ' + file2.A1532MTAX + ' ' + Util.fillString2(formatDblNumber.format(file2.A1532VTAX.toString()),13) + '\n';
//            }
//            txaTax.text = strTexto;
//        }else{
//            txaTax.text = '';
//        }
//        strTexto = '';
//        //COMM
//        if(lstTKT_COMM.length > 0){
//                strTexto = 'Type Cur ' + Util.fillString2('Amount',13) + ' \n';
//                for(j=0;j<lstTKT_COMM.length;j++){
//                        file3 = PX036S01A1533Filter(lstTKT_COMM.getItemAt(j));
//                        strTexto+=file3.A1533TIPO + '   ' + file3.A1533MCOM + ' ' + Util.fillString2(formatDblNumber.format(file3.A1533VCOM.toString()),13) + '\n';
//                }
//                txaComm.text = strTexto;
//        }else{
//                txaComm.text = '';
//        }
//        strTexto = '';
//        //TAXCOMM
//        if(lstTKT_TAXCOMM.length > 0){
//            strTexto = 'Code   Cur ' + Util.fillString2('Amount',13) + ' \n';
//            for(j=0;j<lstTKT_TAXCOMM.length;j++){
//                    file4 = PX036S01A1534Filter(lstTKT_TAXCOMM.getItemAt(j));
//                    strTexto+=file4.A1534CTCOM + ' ' + file4.A1534MTXC + ' ' + Util.fillString2(formatDblNumber.format(file4.A1534VTXC.toString()),13) + '\n';
//            }
//            txaTaxComm.text = strTexto;
//        }else{
//            txaTaxComm.text = '';
//        }
    },
});


