Ext.define('Ext.Praxis.controller.payments.DirectSales.DataEntryDirectSalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDirectSalesController',

    init: function (view) {
    },
    afterRender: function () {
        this.p = this.view.params;
        this.getDataInputs(this.p.rec);
        this.loadVoucher(this.p.rec);
    },
    getDataInputs: function (rec) {
        // ADATE es editable a pesar de ser parte de la llave: se guarda el
        // valor original (antes de cualquier edición) para poder ubicar el
        // registro correcto al momento de actualizar (ver doUpdate).
        this.originalADATE = rec.get('ADATE');

        // ── Llave principal del registro (solo lectura, en rojo) ────────────────
        Ext.getCmp(prototype.id + '-deCCUST').setValue(rec.get('CCUST'));
        Ext.getCmp(prototype.id + '-deTREG').setValue(rec.get('TREG'));
        Ext.getCmp(prototype.id + '-deADATE').setValue(rec.get('ADATE'));
        Ext.getCmp(prototype.id + '-deSCOUNTRY').setValue(rec.get('SCOUNTRY'));
        Ext.getCmp(prototype.id + '-deSAGENT').setValue(rec.get('SAGENT'));
        Ext.getCmp(prototype.id + '-deSCURRENCY').setValue(rec.get('SCURRENCY'));
        Ext.getCmp(prototype.id + '-deCBATCH').setValue(rec.get('CBATCH'));
        Ext.getCmp(prototype.id + '-deSEQ').setValue(rec.get('SEQ'));

        var stvalMap = {'1': 'Match', '5': 'Match Manual', '3': 'Pendiente'};
        var stval = rec.get('STVAL');
        Ext.getCmp(prototype.id + '-deSTVAL').setValue(stvalMap[stval] || stval);

        // Se muestran como texto plano (sin separador de miles) porque, al
        // editarse, ese mismo texto es lo que se enviará al servidor.
        Ext.getCmp(prototype.id + '-deNETO').setValue(rec.get('NETO'));
        Ext.getCmp(prototype.id + '-dePAYAMOU').setValue(rec.get('PAYAMOU'));

        Ext.getCmp(prototype.id + '-deSDATE').setValue(rec.get('SDATE'));

        // Abono Date no debería ser anterior a la Sales Date: si pasa, se
        // pintan ambos campos de amarillo para que el usuario lo note.
        var adateCmp = Ext.getCmp(prototype.id + '-deADATE');
        var sdateCmp = Ext.getCmp(prototype.id + '-deSDATE');
        var isDateMismatch = rec.get('ADATE') && rec.get('SDATE') && rec.get('ADATE') < rec.get('SDATE');
        var mismatchColor = isDateMismatch ? '#FFF176' : '';
        if (adateCmp.inputEl) {
            adateCmp.inputEl.setStyle('background-color', mismatchColor);
        }
        if (sdateCmp.inputEl) {
            sdateCmp.inputEl.setStyle('background-color', mismatchColor);
        }

        Ext.getCmp(prototype.id + '-deREFERENCE').setValue(rec.get('REFERENCE'));
        Ext.getCmp(prototype.id + '-deSFILE').setValue(rec.get('SFILE'));
        Ext.getCmp(prototype.id + '-deNPAG').setValue(rec.get('NPAG'));
        Ext.getCmp(prototype.id + '-deCOMMENTS').setValue(rec.get('COMMENTS'));

        Ext.getCmp(prototype.id + '-deUSCR').setValue(rec.get('USCR'));
        Ext.getCmp(prototype.id + '-deFECR').setValue(rec.get('FECR'));
        Ext.getCmp(prototype.id + '-deHOCR').setValue(rec.get('HOCR'));
        Ext.getCmp(prototype.id + '-dePGMCR').setValue(rec.get('PGMCR'));

        Ext.getCmp(prototype.id + '-deUSUP').setValue(rec.get('USUP'));
        Ext.getCmp(prototype.id + '-deFEUP').setValue(rec.get('FEUP'));
        Ext.getCmp(prototype.id + '-deHOUP').setValue(rec.get('HOUP'));
        Ext.getCmp(prototype.id + '-dePGMUP').setValue(rec.get('PGMUP'));
    },
    loadVoucher: function (rec) {
        var sfile = rec.get('SFILE');
        var sagent = rec.get('SAGENT');
        var adate = rec.get('ADATE');
        var npag = rec.get('NPAG');

        var iframe = document.getElementById('pdfIframeVoucherDS');
        if (!iframe) {
            return;
        }

        if (!sfile || !sagent || !adate) {
            return;
        }

        var year = adate.toString().substring(0, 4);

        var targetPage = parseInt(npag, 10);
        var pageHash = (!isNaN(targetPage) && targetPage > 0) ? ('#page=' + targetPage) : '';

        // El endpoint decide del lado del servidor si sirve .pdf, .png o el archivo
        // original, según lo que realmente exista en la carpeta. Se manda también
        // adate para que, si SFILE no calza por nombre (tildes corruptas al guardarse
        // en la base), busque por prefijo "sagent_adate" en la carpeta.
        var url = prototype.url + '/downloadVoucher' +
                '?sfile=' + encodeURIComponent(sfile) +
                '&sagent=' + encodeURIComponent(sagent) +
                '&year=' + encodeURIComponent(year) +
                '&adate=' + encodeURIComponent(adate) +
                '&disposition=inline' + pageHash;

        iframe.src = url;
    },
    onUpdateClick: function (btn) {
        var self = this;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: '¿Está seguro de actualizar?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            scope: self,
            fn: function (result) {
                if (result === 'yes') {
                    self.doUpdate();
                }
            }
        });
    },
    doUpdate: function () {
        // "self" es este controller (DataEntry); "me" (global, sin var) es
        // la instancia de DirectSalesController que armó la grilla detrás.
        // Se usan nombres distintos para no taparse entre sí.
        var self = this;
        var bean = {};

        // Llave del registro: ADATE_OLD es el valor que tenía al abrir el
        // DataEntry (antes de cualquier edición), ya que ADATE es editable
        // y pudo haber cambiado en pantalla.
        bean.CCUST = Ext.getCmp(prototype.id + '-deCCUST').getValue();
        bean.TREG = Ext.getCmp(prototype.id + '-deTREG').getValue();
        bean.ADATE_OLD = self.originalADATE;
        bean.SCOUNTRY = Ext.getCmp(prototype.id + '-deSCOUNTRY').getValue();
        bean.SAGENT = Ext.getCmp(prototype.id + '-deSAGENT').getValue();
        bean.SCURRENCY = Ext.getCmp(prototype.id + '-deSCURRENCY').getValue();
        bean.CBATCH = Ext.getCmp(prototype.id + '-deCBATCH').getValue();
        bean.SEQ = Ext.getCmp(prototype.id + '-deSEQ').getValue();

        bean.ADATE = Ext.getCmp(prototype.id + '-deADATE').getValue();
        bean.NETO = Ext.getCmp(prototype.id + '-deNETO').getValue();
        bean.PAYAMOU = Ext.getCmp(prototype.id + '-dePAYAMOU').getValue();
        bean.SDATE = Ext.getCmp(prototype.id + '-deSDATE').getValue();
        bean.REFERENCE = Ext.getCmp(prototype.id + '-deREFERENCE').getValue();
        bean.SFILE = Ext.getCmp(prototype.id + '-deSFILE').getValue();
        bean.NPAG = Ext.getCmp(prototype.id + '-deNPAG').getValue();
        bean.COMMENTS = Ext.getCmp(prototype.id + '-deCOMMENTS').getValue();

        self.view.mask('Updating...');
        Ext.Ajax.request({
            url: prototype.url + '/updateDirectSales',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(bean)
            },
            success: function (response) {
                self.view.unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    // Se vuelve a ejecutar la misma búsqueda que armó esta
                    // grilla (mismo filtro en me.paramsDetail) para que se
                    // vean los datos ya actualizados, no los de antes.
                    if (typeof me !== 'undefined' && me.setGridDetDirectSales) {
                        me.setGridDetDirectSales();
                    }
                    self.view.close();
                } else {
                    global.Msg({msg: res.msg || 'Error updating record.'});
                }
            },
            failure: function () {
                self.view.unmask();
                global.Msg({msg: 'Error updating record.'});
            }
        });
    },
    onCancelClick: function (btn) {
        var iframe = document.getElementById('pdfIframeVoucherDS');
        if (iframe) {
            iframe.removeAttribute('src');
        }
        this.view.close();
    }

});
