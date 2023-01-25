/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.SpdrspcrQuery.DetailSpdrspcrQueryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailSpdrspcrQueryController',
    init: function(view) {
        var me = this;
        // console.log(this.view.params.action)
    },
    afterRender: function() {

        this.onLoadData();
    },
    onLoadData: function() {
        var me = this;
        rec = me.view.params.rec;
        if(me.view.params.option==='2'){
            Ext.getCmp(prototype.id01 + '-txtNumber').labelEl.update(rec.A3540TYPE+' number'); 
            Ext.getCmp(prototype.id01 + '-txtNumber').setValue(rec.A3540NMEMO);
            Ext.getCmp(prototype.id01 + '-txtIssuedate').setValue(rec.A3540FMEMO);
            Ext.getCmp(prototype.id01 + '-txtCOUNTRY').setValue(rec.A3540PAIS);
            Ext.getCmp(prototype.id01 + '-txtBillingPeriod').setValue(rec.A3540PERIO);
            Ext.getCmp(prototype.id01 + '-txtNRerela').setValue(rec.A3540RMEMO);
            Ext.getCmp(prototype.id01 + '-txtCur').setValue(rec.A3540CUR);
            Ext.getCmp(prototype.id01 + '-txtType').setValue(rec.A3540TYPE);
            Ext.getCmp(prototype.id01 + '-txtIata').setValue(rec.A3540IATA);
            Ext.getCmp(prototype.id01 + '-txtAgencia').setValue(rec.A3540AGEN); 
            Ext.getCmp(prototype.id01 + '-txaReason').setValue(rec.A3540DESCR);
            Ext.getCmp(prototype.id01 + '-txtTrncu').setValue(rec.A3540TRNCU);
            if(rec.A3540TRNCU!==''){
                Ext.getCmp(prototype.id01 + '-ADM/ACM').labelEl.update(rec.A3540TRNCU+ ' Calculation');
            }

            //Ext.getCmp(prototype.id01 + '-win').labelEl.update(rec.get('A3540TRNCU')+ ' PER REPORTING PERIOD');

            Ext.getCmp(prototype.id01 + '-txtGROSSFAREADM').setValue(Ext.util.Format.number((rec.A3540TARID + rec.A3540PENAD +  rec.A3540TCARD), '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtGROSSFAREAero').setValue(Ext.util.Format.number(rec.A3540TARIF, '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtGROSSFAREAGENT').setValue(Ext.util.Format.number(rec.A3540TARIA, '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtGROSSFAREDIFE').setValue(Ext.util.Format.number( ( (rec.A3540TARID + rec.A3540PENAD +  rec.A3540TCARD) -(rec.A3540TARIF + rec.A3540TARIA)), '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtTaxADM').setValue(Ext.util.Format.number((rec.A3540TTAXD + rec.A3540TTAMD), '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtTaxAero').setValue(Ext.util.Format.number(rec.A3540TTAX, '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtTaxAGENT').setValue(Ext.util.Format.number(rec.A3540TTAXA, '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtTaxDIFE').setValue(Ext.util.Format.number( (( rec.A3540TTAXD + rec.A3540TTAMD) - (rec.A3540TTAX - rec.A3540TTAXA) ), '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtCommissionADM').setValue(Ext.util.Format.number((rec.A3540COMID + rec.A3540SCOMD), '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtCommissionAero').setValue(Ext.util.Format.number(rec.A3540COMIS, '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setValue(Ext.util.Format.number(rec.A3540COMIA, '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').setValue(Ext.util.Format.number( ( (rec.A3540COMID + rec.A3540SCOMD) -(rec.A3540COMIS + rec.A3540COMIA)), '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtTAXCPADM').setValue(Ext.util.Format.number(rec.A3540TAXCD, '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtTAXCPAero').setValue(Ext.util.Format.number(rec.A3540TAXCM, '0,000.00')); 
            Ext.getCmp(prototype.id01 + '-txtTAXCPAGENT').setValue(Ext.util.Format.number(rec.A3540TAXCA, '0,000.00')); 
            Ext.getCmp(prototype.id01 + '-txtTAXCPDIFE').setValue(Ext.util.Format.number( ( rec.A3540TAXCD - (rec.A3540TAXCM + rec.A3540TAXCA) ), '0,000.00')); 


            Ext.getCmp(prototype.id01 + '-txtTOADM').setValue(Ext.util.Format.number(rec.A3540TOTAD, '0,000.00')); 

            Ext.getCmp(prototype.id01 + '-txtTOAero').setValue(Ext.util.Format.number(rec.A3540TOTAL, '0,000.00')); 
            Ext.getCmp(prototype.id01 + '-txtTOAGENT').setValue(Ext.util.Format.number(rec.A3540TOTAA, '0,000.00')); 
            Ext.getCmp(prototype.id01 + '-txtTODIFE').setValue(Ext.util.Format.number(rec.A3540NETD, '0,000.00')); 
        }else{
            Ext.getCmp(prototype.id01 + '-txtNumber').labelEl.update(rec.get('A3540TYPE')+' number'); 
            Ext.getCmp(prototype.id01 + '-txtNumber').setValue(rec.get('A3540NMEMO'));
            Ext.getCmp(prototype.id01 + '-txtIssuedate').setValue(rec.get('A3540FMEMO'));
            Ext.getCmp(prototype.id01 + '-txtCOUNTRY').setValue(rec.get('A3540PAIS'));
            Ext.getCmp(prototype.id01 + '-txtBillingPeriod').setValue(rec.get('A3540PERIO'));
            Ext.getCmp(prototype.id01 + '-txtNRerela').setValue(rec.get('A3540RMEMO'));
            Ext.getCmp(prototype.id01 + '-txtCur').setValue(rec.get('A3540CUR'));
            Ext.getCmp(prototype.id01 + '-txtType').setValue(rec.get('A3540TYPE'));
            Ext.getCmp(prototype.id01 + '-txtIata').setValue(rec.get('A3540IATA'));
            Ext.getCmp(prototype.id01 + '-txtAgencia').setValue(rec.get('A3540AGEN')); 
            Ext.getCmp(prototype.id01 + '-txaReason').setValue(rec.get('A3540DESCR'));
            Ext.getCmp(prototype.id01 + '-txtTrncu').setValue(rec.get('A3540TRNCU'));
            if(rec.get('A3540TRNCU')!==''){
                Ext.getCmp(prototype.id01 + '-ADM/ACM').labelEl.update(rec.get('A3540TRNCU')+ ' Calculation');
            }

            //Ext.getCmp(prototype.id01 + '-win').labelEl.update(rec.get('A3540TRNCU')+ ' PER REPORTING PERIOD');

            Ext.getCmp(prototype.id01 + '-txtGROSSFAREADM').setValue(Ext.util.Format.number((rec.get('A3540TARID') + rec.get('A3540PENAD') +  rec.get('A3540TCARD')), '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtGROSSFAREAero').setValue(Ext.util.Format.number(rec.get('A3540TARIF'), '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtGROSSFAREAGENT').setValue(Ext.util.Format.number(rec.get('A3540TARIA'), '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtGROSSFAREDIFE').setValue(Ext.util.Format.number( ( (rec.get('A3540TARID') + rec.get('A3540PENAD') +  rec.get('A3540TCARD')) -(rec.get('A3540TARIF') + rec.get('A3540TARIA'))), '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtTaxADM').setValue(Ext.util.Format.number((rec.get('A3540TTAXD') + rec.get('A3540TTAMD')), '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtTaxAero').setValue(Ext.util.Format.number(rec.get('A3540TTAX'), '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtTaxAGENT').setValue(Ext.util.Format.number(rec.get('A3540TTAXA'), '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtTaxDIFE').setValue(Ext.util.Format.number( (( rec.get('A3540TTAXD') + rec.get('A3540TTAMD')) - (rec.get('A3540TTAX') - rec.get('A3540TTAXA')) ), '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtCommissionADM').setValue(Ext.util.Format.number((rec.get('A3540COMID') + rec.get('A3540SCOMD')), '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtCommissionAero').setValue(Ext.util.Format.number(rec.get('A3540COMIS'), '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtCommissionAGENT').setValue(Ext.util.Format.number(rec.get('A3540COMIA'), '0,000.00'));
            Ext.getCmp(prototype.id01 + '-txtCommissionDIFE').setValue(Ext.util.Format.number( ( (rec.get('A3540COMID') + rec.get('A3540SCOMD')) -(rec.get('A3540COMIS') + rec.get('A3540COMIA'))), '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtTAXCPADM').setValue(Ext.util.Format.number(rec.get('A3540TAXCD'), '0,000.00'));

            Ext.getCmp(prototype.id01 + '-txtTAXCPAero').setValue(Ext.util.Format.number(rec.get('A3540TAXCM'), '0,000.00')); 
            Ext.getCmp(prototype.id01 + '-txtTAXCPAGENT').setValue(Ext.util.Format.number(rec.get('A3540TAXCA'), '0,000.00')); 
            Ext.getCmp(prototype.id01 + '-txtTAXCPDIFE').setValue(Ext.util.Format.number( ( rec.get('A3540TAXCD') - (rec.get('A3540TAXCM') + rec.get('A3540TAXCA')) ), '0,000.00')); 


            Ext.getCmp(prototype.id01 + '-txtTOADM').setValue(Ext.util.Format.number(rec.get('A3540TOTAD'), '0,000.00')); 

            Ext.getCmp(prototype.id01 + '-txtTOAero').setValue(Ext.util.Format.number(rec.get('A3540TOTAL'), '0,000.00')); 
            Ext.getCmp(prototype.id01 + '-txtTOAGENT').setValue(Ext.util.Format.number(rec.get('A3540TOTAA'), '0,000.00')); 
            Ext.getCmp(prototype.id01 + '-txtTODIFE').setValue(Ext.util.Format.number(rec.get('A3540NETD'), '0,000.00')); 
        }
               

       
    },
    
    OnColumnRazones1Renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        var  archivo='';
        if(Ext.String.trim(value) !==''){
             archivo= 'Download';                              
        }//'DetailBsplinkRefundQueryRFND'
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp( \'DetailRefundQueryRFND\').getController().onWinFile1ViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    onCloseClick: function(obj) {
        Ext.getCmp(prototype.id01 + '-win').close();

    }
   
});