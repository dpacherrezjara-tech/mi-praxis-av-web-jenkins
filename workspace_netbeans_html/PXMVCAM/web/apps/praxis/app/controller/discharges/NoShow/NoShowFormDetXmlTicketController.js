
Ext.define('Ext.Praxis.controller.discharges.NoShow.NoShowFormDetXmlTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id04 + '-noShowFormDetXmlTicketController',
    url: CONTEXTPATH + '/NoShow',
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //Initialize INPUTs    
        //Ext.getCmp(prototype.id04 + '-TICKET_NUMBER').focus();
        this.get_load_grid_ticket_detXML();
    },
    get_load_grid_ticket_detXML: function () {

        var p = this.view.params;  
        var VL_TICKET_NUMBER = p.rec.data.TICKET_NUMBER; //139 2115 123456
        var bean = {};        
        bean.VP_A3935CCIA = VL_TICKET_NUMBER.substring(0,3);
        bean.VP_A3935FORMA = VL_TICKET_NUMBER.substring(3,7);
        bean.VP_A3935SERIE = VL_TICKET_NUMBER.substring(7,13);
        bean.VP_A3935SEQ = p.rec.data.SEQ;
        bean.limit = "-1";
        bean.page = "-1";
               
        Ext.Ajax.request({
            url: prototype.url + '/search_info_boleto_XML',
            timeout: 60000000,
            method: 'POST',
            params: bean,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                //console.log(res); 
                
                Ext.getCmp(prototype.id04 + '-A3935CCIA').setValue(res.dataCab.A3935CCIA);
                Ext.getCmp(prototype.id04 + '-TICKET_NUMBER').setValue(res.dataCab.A3935FORMA + res.dataCab.A3935SERIE);
                Ext.getCmp(prototype.id04 + '-A3935SEQ').setValue(res.dataCab.A3935SEQ);
                Ext.getCmp(prototype.id04 + '-A3935TCPNS').setValue(res.dataCab.A3935TCPNS);
                Ext.getCmp(prototype.id04 + '-A3935FLAG').setValue(res.dataCab.A3935FLAG);
                Ext.getCmp(prototype.id04 + '-A3935FPROC').setValue(res.dataCab.A3935FPROC);
                Ext.getCmp(prototype.id04 + '-A3935TRNCU').setValue(res.dataCab.A3935TRNCU);
                Ext.getCmp(prototype.id04 + '-A3935TDOC').setValue(res.dataCab.A3935TDOC);
                Ext.getCmp(prototype.id04 + '-A3935AGENT').setValue(res.dataCab.A3935AGENT);
                Ext.getCmp(prototype.id04 + '-A3935FECVT').setValue(res.dataCab.A3935FECVT);
                Ext.getCmp(prototype.id04 + '-A3935PNR').setValue(res.dataCab.A3935PNR);
                Ext.getCmp(prototype.id04 + '-A3935PNRSP').setValue(res.dataCab.A3935PNRSP);
                Ext.getCmp(prototype.id04 + '-A3935FRESV').setValue(res.dataCab.A3935FRESV);
                Ext.getCmp(prototype.id04 + '-A3935CODIT').setValue(res.dataCab.A3935CODIT);
                Ext.getCmp(prototype.id04 + '-A3935ORIG').setValue(res.dataCab.A3935ORIG+res.dataCab.A3935DEST);
                Ext.getCmp(prototype.id04 + '-A3935ITTY').setValue(res.dataCab.A3935ITTY);
                Ext.getCmp(prototype.id04 + '-A3935PAX').setValue(res.dataCab.A3935PAX);
                Ext.getCmp(prototype.id04 + '-A3935TPAX').setValue(res.dataCab.A3935TPAX);
                Ext.getCmp(prototype.id04 + '-A3935PCITY').setValue(res.dataCab.A3935PCITY);
                Ext.getCmp(prototype.id04 + '-A3935CIUVT').setValue(res.dataCab.A3935CIUVT);
                Ext.getCmp(prototype.id04 + '-A3935ENDOR').setValue(res.dataCab.A3935ENDOR);
                Ext.getCmp(prototype.id04 + '-A3935FRCA').setValue(res.dataCab.A3935FRCA);
                Ext.getCmp(prototype.id04 + '-A3935PSVTA').setValue(res.dataCab.A3935PSVTA);
                Ext.getCmp(prototype.id04 + '-A3935CPUI').setValue(res.dataCab.A3935CPUI);
                Ext.getCmp(prototype.id04 + '-A3935INCLT').setValue(res.dataCab.A3935INCLT);
                
                
                //grid
                Ext.getCmp(prototype.id04 + '-gridData').setStore(res.dataDet);
                Ext.getCmp(prototype.id04 + '-paggin').setStore(res.dataDet);
            }
        });
    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id04 + '-NoShowFormDetXmlTicket').close();
    }    
});
