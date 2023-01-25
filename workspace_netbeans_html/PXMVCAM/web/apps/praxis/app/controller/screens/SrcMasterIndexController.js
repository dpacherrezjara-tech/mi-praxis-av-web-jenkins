Ext.define('Ext.Praxis.controller.screens.SrcMasterIndexController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SrcMasterIndexController',
    bean: {},
    actionCode: 'V',
    meMaster : '',
    init: function(view) {
        
        
        console.log('init SrcMasterIndexController' );
        console.log( view );
        meMaster = this;
        prototype.MasterIndex = {
            id: 'SrcMasterIndexForm',
            url: CONTEXTPATH+'/SrcMasterIndex'
        };
    },
    afterRender: function() {
        
        console.log('afterRender:'  );
        
        switch(this.actionCode){
            case 'I':
//                limpiarData();
                Ext.getCmp(prototype.MasterIndex.id+'-btnSave').hide();
                Ext.getCmp(prototype.MasterIndex.id+'-btnUpdate').hide();
                Ext.getCmp(prototype.MasterIndex.id+'-btnDelete').hide();
                break;
            case 'U':
//                limpiarData();
                Ext.getCmp(prototype.MasterIndex.id+'-btnSave').hide();
                Ext.getCmp(prototype.MasterIndex.id+'-btnUpdate').hide();
                Ext.getCmp(prototype.MasterIndex.id+'-btnDelete').hide();
                break;
            case 'S':
//                limpiarData();
                Ext.getCmp(prototype.MasterIndex.id+'-btnSave').hide();
                Ext.getCmp(prototype.MasterIndex.id+'-btnUpdate').hide();
                Ext.getCmp(prototype.MasterIndex.id+'-btnDelete').hide();

                this.searchMasterIndex(this.bean);
                break;
        }
    },
    searchMasterIndex: function(bean) {
        console.log('searchMasterIndex');
        console.log(this.bean);
        
        
        Ext.Ajax.request({
            url: prototype.MasterIndex.url + '/searchMasterIndex',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.bean)},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                

                meMaster.mostrarData(res.listaData);
            }
        });
        
        
    },
    mostrarData: function (lstA020) {
        
            console.log('mostrarData');
            console.log(lstA020);
        
        
            for (var i = 0; i < lstA020.length; i++) {
                var beanTemp = lstA020[i];
                
                
                switch(beanTemp.pos.toString()){
                    case '1':
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020KEY').setValue(beanTemp.A020KEY);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RUTAP').setValue(beanTemp.A020RUTAP);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO').setValue(beanTemp.A020GRUPOTUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020BASE').setValue(beanTemp.A020BASE);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVENTA').setValue(beanTemp.A020FVENTA);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVLO').setValue(beanTemp.A020FVLO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUFECH').setValue(beanTemp.A020SUFECH);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TUSO').setValue(beanTemp.A020TUSO);
                        
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUDEBI').setValue(Ext.util.Format.number(beanTemp.A020SUDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPNAC').setValue(Ext.util.Format.number(beanTemp.A020IMPNAC, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ANALIZ').setValue(Ext.util.Format.number(beanTemp.A020ANALIZ, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTDEB').setValue(Ext.util.Format.number(beanTemp.A020TOTDEB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ACEPTA').setValue(Ext.util.Format.number(beanTemp.A020ACEPTA, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPINT').setValue(Ext.util.Format.number(beanTemp.A020IMPINT, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISP').setValue(Ext.util.Format.number(beanTemp.A020COMISP, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTHAB').setValue(Ext.util.Format.number(beanTemp.A020TOTHAB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020REDEBI').setValue(Ext.util.Format.number(beanTemp.A020REDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISI').setValue(Ext.util.Format.number(beanTemp.A020COMISI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TAX').setValue(Ext.util.Format.number(beanTemp.A020TAX, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020NETO').setValue(Ext.util.Format.number(beanTemp.A020NETO, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMSN').setValue(beanTemp.A020RMSN);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto1').setValue(Ext.util.Format.number(beanTemp.Neto1, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto2').setValue(Ext.util.Format.number(beanTemp.Neto2, '0,000.00'));
//                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020NETO').setValue(Ext.util.Format.number(beanTemp.A020NETO, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020MNRCD').setValue(beanTemp.A020MNRCD);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMANT').setValue(beanTemp.A020RMANT);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblTicket1').setText(beanTemp.Titulo);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblAirline1').setText(beanTemp.Titulo2);
                        
                        Ext.getCmp(prototype.MasterIndex.id+'-BoxCupon1').show();
                        break;
                    case '2':
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020KEY1').setValue(beanTemp.A020KEY);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RUTAP1').setValue(beanTemp.A020RUTAP);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO1').setValue(beanTemp.A020GRUPOTUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020BASE1').setValue(beanTemp.A020BASE);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVENTA1').setValue(beanTemp.A020FVENTA);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVLO1').setValue(beanTemp.A020FVLO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUFECH1').setValue(beanTemp.A020SUFECH);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TUSO1').setValue(beanTemp.A020TUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUDEBI1').setValue(Ext.util.Format.number(beanTemp.A020SUDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPNAC1').setValue(Ext.util.Format.number(beanTemp.A020IMPNAC, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ANALIZ1').setValue(Ext.util.Format.number(beanTemp.A020ANALIZ, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTDEB1').setValue(Ext.util.Format.number(beanTemp.A020TOTDEB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ACEPTA1').setValue(Ext.util.Format.number(beanTemp.A020ACEPTA, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPINT1').setValue(Ext.util.Format.number(beanTemp.A020IMPINT, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISP1').setValue(Ext.util.Format.number(beanTemp.A020COMISP, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTHAB1').setValue(Ext.util.Format.number(beanTemp.A020TOTHAB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020REDEBI1').setValue(Ext.util.Format.number(beanTemp.A020REDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISI1').setValue(Ext.util.Format.number(beanTemp.A020COMISI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TAX1').setValue(Ext.util.Format.number(beanTemp.A020TAX, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020NETO1').setValue(Ext.util.Format.number(beanTemp.A020NETO, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMSN1').setValue(beanTemp.A020RMSN);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto11').setValue(Ext.util.Format.number(beanTemp.Neto1, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto21').setValue(Ext.util.Format.number(beanTemp.Neto2, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020MNRCD1').setValue(beanTemp.A020MNRCD);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMANT1').setValue(beanTemp.A020RMANT);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblTicket2').setText(beanTemp.Titulo);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblAirline2').setText(beanTemp.Titulo2);
                        Ext.getCmp(prototype.MasterIndex.id+'-BoxCupon2').show();
                        break;
                    case '3':
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020KEY2').setValue(beanTemp.A020KEY);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RUTAP2').setValue(beanTemp.A020RUTAP);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO2').setValue(beanTemp.A020GRUPOTUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020BASE2').setValue(beanTemp.A020BASE);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVENTA2').setValue(beanTemp.A020FVENTA);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVLO2').setValue(beanTemp.A020FVLO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUFECH2').setValue(beanTemp.A020SUFECH);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TUSO2').setValue(beanTemp.A020TUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUDEBI2').setValue(Ext.util.Format.number(beanTemp.A020SUDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPNAC2').setValue(Ext.util.Format.number(beanTemp.A020IMPNAC, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ANALIZ2').setValue(Ext.util.Format.number(beanTemp.A020ANALIZ, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTDEB2').setValue(Ext.util.Format.number(beanTemp.A020TOTDEB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ACEPTA2').setValue(Ext.util.Format.number(beanTemp.A020ACEPTA, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPINT2').setValue(Ext.util.Format.number(beanTemp.A020IMPINT, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISP2').setValue(Ext.util.Format.number(beanTemp.A020COMISP, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTHAB2').setValue(Ext.util.Format.number(beanTemp.A020TOTHAB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020REDEBI2').setValue(Ext.util.Format.number(beanTemp.A020REDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISI2').setValue(Ext.util.Format.number(beanTemp.A020COMISI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TAX2').setValue(Ext.util.Format.number(beanTemp.A020TAX, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020NETO2').setValue(Ext.util.Format.number(beanTemp.A020NETO, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMSN2').setValue(beanTemp.A020RMSN);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto12').setValue(Ext.util.Format.number(beanTemp.Neto1, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto22').setValue(Ext.util.Format.number(beanTemp.Neto2, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020MNRCD2').setValue(beanTemp.A020MNRCD);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMANT2').setValue(beanTemp.A020RMANT);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblTicket3').setText(beanTemp.Titulo);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblAirline3').setText(beanTemp.Titulo2);
                        Ext.getCmp(prototype.MasterIndex.id+'-BoxCupon3').show();
                        break;
                    case '4':
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020KEY3').setValue(beanTemp.A020KEY);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RUTAP3').setValue(beanTemp.A020RUTAP);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO3').setValue(beanTemp.A020GRUPOTUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020BASE3').setValue(beanTemp.A020BASE);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVENTA3').setValue(beanTemp.A020FVENTA);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVLO3').setValue(beanTemp.A020FVLO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUFECH3').setValue(beanTemp.A020SUFECH);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TUSO3').setValue(beanTemp.A020TUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUDEBI3').setValue(Ext.util.Format.number(beanTemp.A020SUDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPNAC3').setValue(Ext.util.Format.number(beanTemp.A020IMPNAC, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ANALIZ3').setValue(Ext.util.Format.number(beanTemp.A020ANALIZ, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTDEB3').setValue(Ext.util.Format.number(beanTemp.A020TOTDEB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ACEPTA3').setValue(Ext.util.Format.number(beanTemp.A020ACEPTA, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPINT3').setValue(Ext.util.Format.number(beanTemp.A020IMPINT, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISP3').setValue(Ext.util.Format.number(beanTemp.A020COMISP, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTHAB3').setValue(Ext.util.Format.number(beanTemp.A020TOTHAB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020REDEBI3').setValue(Ext.util.Format.number(beanTemp.A020REDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISI3').setValue(Ext.util.Format.number(beanTemp.A020COMISI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TAX3').setValue(Ext.util.Format.number(beanTemp.A020TAX, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020NETO3').setValue(Ext.util.Format.number(beanTemp.A020NETO, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMSN3').setValue(beanTemp.A020RMSN);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto13').setValue(Ext.util.Format.number(beanTemp.Neto1, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto23').setValue(Ext.util.Format.number(beanTemp.Neto2, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020MNRCD3').setValue(beanTemp.A020MNRCD);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMANT3').setValue(beanTemp.A020RMANT);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblTicket4').setText(beanTemp.Titulo);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblAirline4').setText(beanTemp.Titulo2);
                        Ext.getCmp(prototype.MasterIndex.id+'-BoxCupon4').show();
                        break;
                    case '5':
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020KEY4').setValue(beanTemp.A020KEY);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RUTAP4').setValue(beanTemp.A020RUTAP);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO4').setValue(beanTemp.A020GRUPOTUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020BASE4').setValue(beanTemp.A020BASE);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVENTA4').setValue(beanTemp.A020FVENTA);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVLO4').setValue(beanTemp.A020FVLO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUFECH4').setValue(beanTemp.A020SUFECH);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TUSO4').setValue(beanTemp.A020TUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUDEBI4').setValue(Ext.util.Format.number(beanTemp.A020SUDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPNAC4').setValue(Ext.util.Format.number(beanTemp.A020IMPNAC, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ANALIZ4').setValue(Ext.util.Format.number(beanTemp.A020ANALIZ, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTDEB4').setValue(Ext.util.Format.number(beanTemp.A020TOTDEB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ACEPTA4').setValue(Ext.util.Format.number(beanTemp.A020ACEPTA, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPINT4').setValue(Ext.util.Format.number(beanTemp.A020IMPINT, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISP4').setValue(Ext.util.Format.number(beanTemp.A020COMISP, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTHAB4').setValue(Ext.util.Format.number(beanTemp.A020TOTHAB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020REDEBI4').setValue(Ext.util.Format.number(beanTemp.A020REDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISI4').setValue(Ext.util.Format.number(beanTemp.A020COMISI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TAX4').setValue(Ext.util.Format.number(beanTemp.A020TAX, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020NETO4').setValue(Ext.util.Format.number(beanTemp.A020NETO, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMSN4').setValue(beanTemp.A020RMSN);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto14').setValue(Ext.util.Format.number(beanTemp.Neto1, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto24').setValue(Ext.util.Format.number(beanTemp.Neto2, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020MNRCD4').setValue(beanTemp.A020MNRCD);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMANT4').setValue(beanTemp.A020RMANT);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblTicket5').setText(beanTemp.Titulo);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblAirline5').setText(beanTemp.Titulo2);
                        Ext.getCmp(prototype.MasterIndex.id+'-BoxCupon5').show();
                        break;
                    case '6':
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020KEY5').setValue(beanTemp.A020KEY);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RUTAP5').setValue(beanTemp.A020RUTAP);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO5').setValue(beanTemp.A020GRUPOTUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020BASE5').setValue(beanTemp.A020BASE);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVENTA5').setValue(beanTemp.A020FVENTA);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVLO5').setValue(beanTemp.A020FVLO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUFECH5').setValue(beanTemp.A020SUFECH);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TUSO5').setValue(beanTemp.A020TUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUDEBI5').setValue(Ext.util.Format.number(beanTemp.A020SUDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPNAC5').setValue(Ext.util.Format.number(beanTemp.A020IMPNAC, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ANALIZ5').setValue(Ext.util.Format.number(beanTemp.A020ANALIZ, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTDEB5').setValue(Ext.util.Format.number(beanTemp.A020TOTDEB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ACEPTA5').setValue(Ext.util.Format.number(beanTemp.A020ACEPTA, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPINT5').setValue(Ext.util.Format.number(beanTemp.A020IMPINT, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISP5').setValue(Ext.util.Format.number(beanTemp.A020COMISP, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTHAB5').setValue(Ext.util.Format.number(beanTemp.A020TOTHAB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020REDEBI5').setValue(Ext.util.Format.number(beanTemp.A020REDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISI5').setValue(Ext.util.Format.number(beanTemp.A020COMISI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TAX5').setValue(Ext.util.Format.number(beanTemp.A020TAX, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020NETO5').setValue(Ext.util.Format.number(beanTemp.A020NETO, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMSN5').setValue(beanTemp.A020RMSN);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto15').setValue(Ext.util.Format.number(beanTemp.Neto1, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto25').setValue(Ext.util.Format.number(beanTemp.Neto2, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020MNRCD5').setValue(beanTemp.A020MNRCD);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMANT5').setValue(beanTemp.A020RMANT);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblTicket6').setText(beanTemp.Titulo);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblAirline6').setText(beanTemp.Titulo2);
                        Ext.getCmp(prototype.MasterIndex.id+'-BoxCupon6').show();
                        break;
                    case '7':
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020KEY6').setValue(beanTemp.A020KEY);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RUTAP6').setValue(beanTemp.A020RUTAP);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO6').setValue(beanTemp.A020GRUPOTUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020BASE6').setValue(beanTemp.A020BASE);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVENTA6').setValue(beanTemp.A020FVENTA);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVLO6').setValue(beanTemp.A020FVLO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUFECH6').setValue(beanTemp.A020SUFECH);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TUSO6').setValue(beanTemp.A020TUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUDEBI6').setValue(Ext.util.Format.number(beanTemp.A020SUDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPNAC6').setValue(Ext.util.Format.number(beanTemp.A020IMPNAC, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ANALIZ6').setValue(Ext.util.Format.number(beanTemp.A020ANALIZ, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTDEB6').setValue(Ext.util.Format.number(beanTemp.A020TOTDEB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ACEPTA6').setValue(Ext.util.Format.number(beanTemp.A020ACEPTA, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPINT6').setValue(Ext.util.Format.number(beanTemp.A020IMPINT, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISP6').setValue(Ext.util.Format.number(beanTemp.A020COMISP, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTHAB6').setValue(Ext.util.Format.number(beanTemp.A020TOTHAB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020REDEBI6').setValue(Ext.util.Format.number(beanTemp.A020REDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISI6').setValue(Ext.util.Format.number(beanTemp.A020COMISI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TAX6').setValue(Ext.util.Format.number(beanTemp.A020TAX, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020NETO6').setValue(Ext.util.Format.number(beanTemp.A020NETO, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMSN6').setValue(beanTemp.A020RMSN);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto16').setValue(Ext.util.Format.number(beanTemp.Neto1, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto26').setValue(Ext.util.Format.number(beanTemp.Neto2, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020MNRCD6').setValue(beanTemp.A020MNRCD);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMANT6').setValue(beanTemp.A020RMANT);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblTicket7').setText(beanTemp.Titulo);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblAirline7').setText(beanTemp.Titulo2);
                        Ext.getCmp(prototype.MasterIndex.id+'-BoxCupon7').show();
                        break;
                    case '8':
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020KEY7').setValue(beanTemp.A020KEY);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RUTAP7').setValue(beanTemp.A020RUTAP);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO7').setValue(beanTemp.A020GRUPOTUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020BASE7').setValue(beanTemp.A020BASE);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVENTA7').setValue(beanTemp.A020FVENTA);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020FVLO7').setValue(beanTemp.A020FVLO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUFECH7').setValue(beanTemp.A020SUFECH);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TUSO7').setValue(beanTemp.A020TUSO);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020SUDEBI7').setValue(Ext.util.Format.number(beanTemp.A020SUDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPNAC7').setValue(Ext.util.Format.number(beanTemp.A020IMPNAC, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ANALIZ7').setValue(Ext.util.Format.number(beanTemp.A020ANALIZ, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTDEB7').setValue(Ext.util.Format.number(beanTemp.A020TOTDEB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020ACEPTA7').setValue(Ext.util.Format.number(beanTemp.A020ACEPTA, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020IMPINT7').setValue(Ext.util.Format.number(beanTemp.A020IMPINT, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISP7').setValue(Ext.util.Format.number(beanTemp.A020COMISP, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TOTHAB7').setValue(Ext.util.Format.number(beanTemp.A020TOTHAB, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020REDEBI7').setValue(Ext.util.Format.number(beanTemp.A020REDEBI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020COMISI7').setValue(Ext.util.Format.number(beanTemp.A020COMISI, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020TAX7').setValue(Ext.util.Format.number(beanTemp.A020TAX, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020NETO7').setValue(Ext.util.Format.number(beanTemp.A020NETO, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMSN7').setValue(beanTemp.A020RMSN);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto17').setValue(Ext.util.Format.number(beanTemp.Neto1, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtneto27').setValue(Ext.util.Format.number(beanTemp.Neto2, '0,000.00'));
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020MNRCD7').setValue(beanTemp.A020MNRCD);
                        Ext.getCmp(prototype.MasterIndex.id+'-txtA020RMANT7').setValue(beanTemp.A020RMANT);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblTicket8').setText(beanTemp.Titulo);
                        Ext.getCmp(prototype.MasterIndex.id+'-lblAirline8').setText(beanTemp.Titulo2);
                        Ext.getCmp(prototype.MasterIndex.id+'-BoxCupon8').show();
                        break;
                }
            }
        
    }
});


