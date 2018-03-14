import { Component, OnDestroy, ContentChild, ElementRef, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef, Input, HostListener } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
})
export class ModalComponent implements OnDestroy {

//RECIBE 3 PARAMETROS DE TIPO TEMPLATE: MODALHEADER, MODALBODY Y MODALFOOTER
  @ContentChild('modalHeader') header: TemplateRef<any>;
  @ContentChild('modalBody') body: TemplateRef<any>;

  visible = false;
  visibleAnimate = false;

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnDestroy() {
    // Prevent modal from not executing its closing actions if the user navigated away (for example,
    // through a link).
    this.close();
  }

  open(): void {
    document.body.classList.add('modal-open');

    this.visible = true;
    setTimeout(() => {
      this.visibleAnimate = true;
    });
  }

  close(): void {
    document.body.classList.remove('modal-open');

    this.visibleAnimate = false;
    setTimeout(() => {
      this.visible = false;
      this.changeDetectorRef.markForCheck();
    }, 200);
  }

  @HostListener('click', ['$event'])
  onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal') && this.isTopMost()) {
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDownHandler(event: KeyboardEvent) {
    // If ESC key and TOP MOST modal, close it.
    if (event.key === 'Escape' && this.isTopMost()) {
      this.close();
    }
  }

  /**
   * Returns true if this modal is the top most modal.
   */
  isTopMost(): boolean {
    return !this.elementRef.nativeElement.querySelector(':scope modal > .modal');
  }
}
