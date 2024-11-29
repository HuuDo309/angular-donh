import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  blogId: string | null = null;
  validBlogIds: number[] = []; 

  constructor(private router: Router, private blogService: BlogService) {}

  toEdit(): void {
    let idToCheck = this.blogId;

    if (!idToCheck) {
      const enteredId = prompt('Vui lòng nhập Blog ID:');
      if (enteredId && !isNaN(Number(enteredId))) {
        idToCheck = enteredId;
      } else {
        alert('ID không hợp lệ.');
        this.router.navigate(['/blogs']);
        return;
      }
    }

    if (idToCheck && this.isBlogIdValid(Number(idToCheck))) {
      this.blogId = idToCheck;
      this.router.navigate([`/blogs/${this.blogId}`]);
    } else {
      const userConfirmed = confirm('Blog không tồn tại. Bạn có muốn tạo blog mới không?');
    
      if (userConfirmed) {
        this.router.navigate(['/create']);
      } else {
        this.router.navigate(['/blogs']);
      }
    }
  }
  

  isBlogIdValid(blogId: number): boolean {
    return this.validBlogIds.includes(blogId);
  }

  ngOnInit(): void {
    this.blogService.getAllBlogIds().subscribe(ids => {
      this.validBlogIds = ids;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      const match = currentUrl.match(/^\/blogs\/(\d+)$/); 
      if (match) {
        this.blogId = match[1];
      } else {
        this.blogId = null;
      }
    });
  }
}
