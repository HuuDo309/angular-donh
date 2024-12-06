import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog } from '../models/blogs';
import { MappingService } from '../mapping.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogListComponent implements OnInit {
  @Input() blogs: Blog[] = [];
  pagedBlogs: Blog[] = []; // Blogs trên trang hiện tại
  currentPage: number = 1; // Trang hiện tại
  pageSize: number = 10;   // Số lượng mục mỗi trang
  totalBlogs: number = 0;  // Tổng số blog
  loading: boolean = false;

  constructor(
    private blogService: BlogService,
    public mappingService : MappingService) {}

  ngOnInit(): void {
    this.loading = true; 
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.totalBlogs = data.length;
        this.updatePagedBlogs();
        this.loading = false; 
      },
      error: (err) => {
        console.error('Error loading blogs:', err);
        this.loading = false;
      }
    });
  }

  // Cập nhật danh sách blog theo trang
  updatePagedBlogs(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedBlogs = this.blogs.slice(startIndex, endIndex);
  }

  // Xử lý khi thay đổi trang hoặc kích thước trang
  onPageChange(pageIndex: number): void {
    this.currentPage = pageIndex;
    this.updatePagedBlogs();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset về trang đầu tiên khi thay đổi kích thước trang
    this.updatePagedBlogs();
  }

  onDelete(blogId: number): void {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?');
    
    if (confirmDelete) {
      this.blogService.deleteBlog(blogId).subscribe(() => {
        this.blogs = this.blogs.filter(blog => blog.id !== blogId);
      });
    } else {
      console.log('hủy');
    }
  }
  
}
