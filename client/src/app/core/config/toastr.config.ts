import { GlobalConfig } from 'ngx-toastr';

export function getToastrConfig(): Partial<GlobalConfig> {
  return {
    timeOut: 5000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    closeButton: true,
    progressBar: true,
    maxOpened: 3,
    autoDismiss: true,
    newestOnTop: true,
    tapToDismiss: true,
    enableHtml: false,
    easeTime: 300
  };
}